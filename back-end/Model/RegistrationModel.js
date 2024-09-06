const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true // Ensuring username is unique
    },
    useremail: {
        type: String,
        required: [true, "Email is required"],
        unique: true // Ensuring email is unique
    },
    userpassword: {
        type: String,
        required: [true, "Password is required"]
    },
    userimage: {
        type: String,
        required: [true, "Image is required"]
    }
}, {
    timestamps: true
});

// Export the model
const RegistrationModel = mongoose.model('Registration', RegistrationSchema);

module.exports = { RegistrationModel };
