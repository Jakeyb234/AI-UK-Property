import express from "express";
import bodyParser from "body-parser";

const app = express();
// Use the port provided by Render or default to 10000
const port = process.env.PORT || 10000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to return mock comps data
app.post("/api/comps", (req, res) => {
  const { postcode } = req.body;
  if (!postcode) {
    return res.status(400).json({ error: "Postcode is required" });
  }

  // Mock comparable properties
  const comps = [
    { address: `10 Example Road, ${postcode}`, price: 350000, type: "Flat", bedrooms: 2 },
    { address: `12 Sample Street, ${postcode}`, price: 370000, type: "Terraced", bedrooms: 3 }
  ];

  // Response
  res.json({
    comps,
    summary: `Found ${comps.length} comparable properties in ${postcode}`
  });
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("AI Property Comps Backend is running 🏡");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
