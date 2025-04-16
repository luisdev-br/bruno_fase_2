const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });



exports.chatWithGemini = async (req, res) => {
  try {
    const { prompt } = req.body;
    const fullPrompt = `Responda sempre em português brasileiro. Pergunta: ${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Erro na Gemini API:", error);
    res.status(500).json({ error: "Erro ao se comunicar com a IA" });
  }
};
