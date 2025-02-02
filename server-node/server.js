import express, { response } from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI();

app.get("/random-text", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a random text generator." },
        {
          role: "user",
          content: "Give me a 5-10 words random text.",
        },
      ],
      store: true,
    });
    const randomText = response.choices[0].message.content;

    // Send it back to the client
    res.json({ text: randomText });
  } catch (error) {
    console.error("Error fetching random text:", error);
    res.status(500).json({ error: "Failed to generate random text" });
  }
});

app.listen(PORT, () => {
  console.log(`Node server listening on port ${PORT}`);
});
