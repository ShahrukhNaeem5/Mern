const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { RegistrationModel } = require("./Model/RegistrationModel");
const { FoodModel } = require('./Model/FoodModel');
const MealModel = require('./Model/Meal');  // Adjust the path if necessary

const dotenv = require("dotenv").config();

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

// Ensure 'uploads' directory exists or create it
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});
const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Error: ", err));

// User Registration Route with multer upload middleware
app.post("/registration", upload.single('userimage'), async (req, res) => {
    try {
        const { username, useremail, userpassword } = req.body;
        const userimage = req.file;

        const existingUser = await RegistrationModel.findOne({
            $or: [{ username }, { useremail }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists." });
        }

        if (!userpassword) {
            return res.status(400).json({ message: "Password is required." });
        }

        const hashedPassword = await bcrypt.hash(userpassword, 10);

        const newUser = await RegistrationModel.create({
            username,
            useremail,
            userpassword: hashedPassword,
            userimage: userimage ? `/uploads/${userimage.filename}` : null
        });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        res.status(200).json({ message: "User registered successfully", token, user: newUser });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
});

// User Login Route
app.post("/login", async (req, res) => {
    const { useremail, userpassword } = req.body;

    try {
        const user = await RegistrationModel.findOne({ useremail });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(userpassword, user.userpassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Middleware for JWT Authentication
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // Store the user data for use in other routes
        next();
    });
};

// Route to check user authentication and return user data
app.get('/protected', authenticateJWT, async (req, res) => {
    try {
        const user = await RegistrationModel.findById(req.user.userId).select('username useremail userimage');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving user" });
    }
});

// Fetch all food items
app.get('/api/foods', async (req, res) => {
    try {
        const foods = await FoodModel.find();
        res.json(foods);
    } catch (error) {
        console.error('Error retrieving food items:', error);
        res.status(500).json({ message: 'Error retrieving food items' });
    }
});

// Save meal data including calories based on quantity
app.post('/saveMeal', authenticateJWT, async (req, res) => {
    const { day, meals } = req.body;

    // Check if all required fields are present
    if (!day || !meals) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const userId = req.user.userId; // Get userId from authenticated user

        // Function to calculate calories for a meal
        const calculateMealItems = async (mealItems) => {
            let totalCalories = 0;
            const updatedMealItems = [];

            // Iterate through each meal item
            for (const item of mealItems) {
                const food = await FoodModel.findOne({ food_name: item.food });

                if (!food) {
                    console.error(`Food item "${item.food}" not found`);
                    continue;  // Skip if the food item is not found
                }

                const foodCalories = food.calories * item.quantity;
                totalCalories += foodCalories;

                updatedMealItems.push({
                    food: item.food,
                    quantity: item.quantity,
                    calories: foodCalories  // Include calculated calories for each item
                });
            }

            return { updatedMealItems, totalCalories };
        };

        // Calculate meals
        const { updatedMealItems: updatedBreakfast, totalCalories: breakfastCalories } = await calculateMealItems(meals.breakfast);
        const { updatedMealItems: updatedLunch, totalCalories: lunchCalories } = await calculateMealItems(meals.lunch);
        const { updatedMealItems: updatedDinner, totalCalories: dinnerCalories } = await calculateMealItems(meals.dinner);

        const totalCalories = breakfastCalories + lunchCalories + dinnerCalories;

        const mealData = new MealModel({
            userId,
            day,
            meals: {
                breakfast: updatedBreakfast,
                lunch: updatedLunch,
                dinner: updatedDinner
            },
            totalCalories
        });

        await mealData.save();

        res.status(200).json({
            message: 'Meal saved successfully',
            meals: {
                breakfast: updatedBreakfast,
                lunch: updatedLunch,
                dinner: updatedDinner
            },
            totalCalories
        });
    } catch (error) {
        console.error('Error saving meal:', error);
        res.status(500).json({ message: 'Error saving meal', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
