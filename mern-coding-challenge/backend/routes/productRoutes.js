const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to fetch products from the S3 URL
router.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const products = response.data;  // The product data from the S3 JSON file
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
