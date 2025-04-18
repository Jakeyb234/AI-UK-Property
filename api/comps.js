import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";
import OpenAI from "openai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());

// Mock scraping function for Rightmove and Zoopla (replace with real logic later)
async function getCompsData(postcode) {
  // 🔧 Simulated results
  return [
    {
      address: "12 Main St, " + postcode,
      price: 320000,
      bedrooms: 3,
      type: "Semi-detached",
    },
    {
      address: "17 Oak Rd, " + postcode,
      price: 340000,
      bedrooms: 3,
      type: "Detached",
    },
    {
      address: "45 Park View, " + postcode,
      price: 310000,
      bedrooms: 3,
      type: "Terraced",
    },
  ];
}

app.post("/api/comps", async (req, res) => {
  const { postcode } = req.body;

  if (!postcode) {
    return res.status(400).json({ error: "Postcode is required." });
  }

  try {
    const comps = await getCompsData(postcode);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful property analyst for the UK housing market.",
        },
        {
          role: "user",
          content: `Here are 3 comparable properties in ${postcode}:\n${JSON.stringify(
            comps,
            null,
            2
          )}\nGive a brief analysis of the local market based on these.`,
        },
      ],
    });

    const summary = response.choices[0].message.content;

    res.json({ comps, summary });
  } catch (error) {
    console.error("Error in /api/comps:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.get("/", (req, res) => {
  res.send("AI Property Comps Backend is running 🏡");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
