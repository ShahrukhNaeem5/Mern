const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { RegistrationModel } = require("./Model/RegistrationModel");
const ConnectionString = require("./Model/Connection_Db");

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Register Form");
});

app.post("/", async (req, res) => {
    try {
        const { username, useremail, userpassword, userimage } = req.body;

        const newUser = await RegistrationModel.create({
            username: username,
            useremail: useremail,
            userpassword: userpassword,
            userimage: userimage,
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

ConnectionString()
    .then(() => {
        app.listen(process.env.Port, () => {
            console.log(`I am running on ${process.env.Port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database", err);
    });
