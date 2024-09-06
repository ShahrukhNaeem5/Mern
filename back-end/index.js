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
const dotenv = require("dotenv").config();

// Initialize express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
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
        // Access user data from req.body
        const { username, useremail, userpassword } = req.body;

        // Check for existing user
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
            userimage: req.file ? req.file.filename : null // Save the filename for the uploaded image
        });

        // Generate JWT
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set token as a cookie
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
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

// Route to check user authentication via JWT
app.get('/protected', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: "Access granted", userId: decoded.userId });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});


// Listen on port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
