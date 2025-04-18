import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse JSON requests
app.use(express.json());

// Define the POST route to fetch property comps
app.post('/api/comps', async (req, res) => {
  try {
    const { location, propertyType, priceRange } = req.body;

    if (!location || !propertyType || !priceRange) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Your logic to fetch property data goes here
    const propertyData = await fetchPropertyData(location, propertyType, priceRange);

    res.status(200).json(propertyData); // Return the fetched property data

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching property data' });
  }
});

// Fetch property data from external API or scraping
async function fetchPropertyData(location, propertyType, priceRange) {
  // Example fetching data logic
  const response = await axios.get(`https://

  console.log(`Server running on port ${port}`);
});
