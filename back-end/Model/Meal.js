const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  meals: {
    breakfast: [
      {
        food: { type: String, required: true },
        quantity: { type: Number, required: true },
        calories: { type: Number, required: true },  // Adding calories field
      },
    ],
    lunch: [
      {
        food: { type: String, required: true },
        quantity: { type: Number, required: true },
        calories: { type: Number, required: true },  // Adding calories field
      },
    ],
    dinner: [
      {
        food: { type: String, required: true },
        quantity: { type: Number, required: true },
        calories: { type: Number, required: true },  // Adding calories field
      },
    ],
  },
});

module.exports = mongoose.model('Meal', mealSchema);
