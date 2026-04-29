const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function explainMealAI(mealPlan) {
  const prompt = `Explain this meal plan in simple terms:
${JSON.stringify(mealPlan, null, 2)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt, // ✅ FIXED
    });

    return response.text;

  } catch (err) {
    console.log("FULL ERROR:", err);
    return "⚠️ AI failed. Try again.";
  }
}

module.exports = { explainMealAI };