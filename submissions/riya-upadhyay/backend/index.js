// backend/index.js

require("dotenv").config(); // 🧠 Must be the FIRST line

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// Debug log - check if env is loading
console.log("Your OpenAI API Key:", process.env.OPENAI_API_KEY);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ FIXED endpoint path — no "http://" in POST route!
app.post("/api/insight", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to fetch AI insight." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🧠 AI Backend running at http://localhost:${PORT}`);
});
