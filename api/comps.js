import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(bodyParser.json());

// Test POST route
app.post("/api/comps", (req, res) => {
  const { postcode } = req.body;

  if (!postcode) {
    return res.status(400).json({ error: "Postcode is required" });
  }

  // Simulate response (you can replace this with OpenAI or scraping later)
  const comps = [
    {
      address: `10 Example Road, ${postcode}`,
      price: 350000,
      type: "Flat",
      bedrooms: 2,
    },
    {
      address: `12 Sample Street, ${postcode}`,
      price: 370000,
      type: "Terraced",
      bedrooms: 3,
    },
  ];

  res.status(200).json({
    comps,
    summary: `Found ${comps.length} comparable properties in ${postcode}`,
  });
});

// Default GET route
app.get("/", (req, res) => {
  res.send("AI Property Comps Backend is running 🏡");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});
