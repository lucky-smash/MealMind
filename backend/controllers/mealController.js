const { generateMealPlan } = require("../services/mealService");

const generateMeal = (req, res) => {
  try {
    const result = generateMealPlan(req.body);
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { generateMeal };
