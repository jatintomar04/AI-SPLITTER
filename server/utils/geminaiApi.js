const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAIResponse = async (userPrompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
You are an elite financial assistant for Splitwise.

Rules:

- Answer in the language that is asked by user like(hindi,english,hinglish etc).
- Use ₹ for all amounts.
- Keep answers short and direct.
- Calculate totals accurately.
- Group categories when asked.
- Compare self vs group when asked.
`
    });

    const result = await model.generateContent(userPrompt);

    return result.response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI response failed";
  }
};

module.exports = generateAIResponse;