// const { generateMealPlan } = require("../services/mealService");

// const generateMeal = (req, res) => {
//   try {
//     const result = generateMealPlan(req.body);
//     res.status(200).json(result);
//     console.log(result);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = { generateMeal };
const { optimizeMeals } = require("../utils/optimizer");
const { explainMealAI } = require("../services/aiService");

const generateMeal = async (req, res) => {
  try {
    const { weight, goal, budget, preference } = req.body;

    const mealPlan = optimizeMeals(weight, goal, budget, preference);

    // 🔥 AI CALL
    const aiExplanation = await explainMealAI(mealPlan);

    res.json({
      ...mealPlan,
      aiExplanation,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
};

module.exports = { generateMeal };