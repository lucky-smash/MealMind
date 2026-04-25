const { optimizeMeals } = require("../utils/optimizer");

function generateMealPlan(data) {
  const { weight, goal, budget, preference } = data;

  // Basic validation
  if (!weight || !goal || !budget || !preference) {
    throw new Error("Missing required fields");
  }

  if (weight <= 0 || budget <= 0) {
    throw new Error("Invalid input values");
  }

  // Call optimizer
  const result = optimizeMeals(weight, goal, budget, preference);

  return result;
}

module.exports = { generateMealPlan };

