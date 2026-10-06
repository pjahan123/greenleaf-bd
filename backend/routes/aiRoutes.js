const express = require('express');
const router = express.Router();

const { GoogleGenerativeAI } = require('@google/generative-ai');

router.post('/ask', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a question.'
      });
    }

    console.log('🌿 AI Question:', message);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY is missing');
      
      return res.status(500).json({
        success: false,
        message: 'Gemini API key is missing.'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.8-flash'
    });

    const prompt = `
You are GreenLeaf BD AI, a helpful plant-care assistant.

Help users with:
- Indoor plants
- Succulents
- Flowering plants
- Air-purifying plants
- Seeds
- Pots and planters
- Watering
- Sunlight
- Soil
- Fertilizer
- Plant diseases
- Pests
- Repotting
- Gardening

Give simple and practical answers for beginner plant owners.

User question:
${message}
`;

    const result = await model.generateContent(prompt);

    const answer = result.response.text();

    console.log('🌱 AI Answer received');

    return res.json({
      success: true,
      answer: answer
    });

  } catch (error) {

    console.error('========== GEMINI ERROR ==========');
    console.error('Message:', error.message);
    console.error('Status:', error.status);
    console.error('Code:', error.code);
    console.error('==================================');

    return res.status(500).json({
      success: false,
      message: error.message || 'AI assistant is temporarily unavailable.'
    });
  }
});

module.exports = router;