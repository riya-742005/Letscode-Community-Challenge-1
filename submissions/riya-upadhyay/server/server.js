const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors()); // enable CORS
app.use(express.json());

app.post("/api/insight", async (req, res) => {
  const { city, prompt } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const json = await response.json();
    res.json({ text: json.choices?.[0]?.message.content || "No response." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch insight" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
