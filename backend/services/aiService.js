const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function explainMealAI(mealPlan) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = "Say hello in 1 line";
        // const result = await model.generateContent(prompt);
        // const response = await result.response;
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;

            console.log("AI RAW:", response);

            return response.text();
        } catch (err) {
            console.log("AI ERROR FULL:", err);
            return "AI explanation not available";
        }

        return response.text();

    } catch (err) {
        console.log("AI ERROR:", err.message);
        return "AI explanation not available";
    }
}

module.exports = { explainMealAI };