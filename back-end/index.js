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
const { FoodModel } = require('./Model/FoodModel'); // Correct import


const dotenv = require("dotenv").config();

// Initialize express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;



// Ensure the 'uploads' directory exists or create it
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

// User Registration Route
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
        console.error("Error during registration:", error); // Log the error
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
});






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

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set token as a cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Route to check user authentication and return user data via JWT
app.get('/protected', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await RegistrationModel.findById(decoded.userId).select('username useremail userimage');
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user); // Send back the user data including the image URL
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  });
  
/* FOOD */
  app.get('/api/foods', async (req, res) => {
    try {
        console.log('Fetching food items'); // Log the request
        const foods = await FoodModel.find(); // Corrected model
        console.log('Foods retrieved:', foods); // Log retrieved foods
        res.json(foods);
    } catch (error) {
        console.error('Error retrieving food items:', error); // Log the error
        res.status(500).json({ message: 'Error retrieving food items' });
    }
});



// Listen on port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
