const express = require('express');
const router = express.Router();
const Meal = require('../Model/Meal');

// POST /api/saveMeal
router.post('/saveMeal', async (req, res) => {
  const { userId, day, meals } = req.body;

  // Validation
  if (!userId || !day || !meals || !meals.breakfast || !meals.lunch || !meals.dinner) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Helper function to calculate total calories
  const calculateTotalCalories = (mealItems) => {
    return mealItems.reduce((total, item) => total + (item.calories || 0), 0);
  };

  // Calculate total calories for each meal
  const breakfastCalories = calculateTotalCalories(meals.breakfast);
  const lunchCalories = calculateTotalCalories(meals.lunch);
  const dinnerCalories = calculateTotalCalories(meals.dinner);
  
  // Calculate total daily calories
  const totalCalories = breakfastCalories + lunchCalories + dinnerCalories;

  // Create new meal document
  const newMeal = new Meal({
    userId,
    day,
    meals: {
      breakfast: meals.breakfast,
      lunch: meals.lunch,
      dinner: meals.dinner,
    },
    totalCalories: {
      breakfast: breakfastCalories,
      lunch: lunchCalories,
      dinner: dinnerCalories,
      total: totalCalories
    }
  });

  try {
    // Save the meal to the database
    const savedMeal = await newMeal.save();
    res.status(201).json({ message: 'Meal saved successfully', data: savedMeal });
  } catch (error) {
    console.error('Error saving meal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
