const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    f_id: Number,
    food_name: String,
    category: String,
    calories: Number
});

const FoodModel = mongoose.model('Food', FoodSchema);

// Export the model
module.exports = { FoodModel };
