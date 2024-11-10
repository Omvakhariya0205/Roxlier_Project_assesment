const express = require('express');
const axios = require('axios');
const ProductTransaction = require('../models/ProductTransaction');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await ProductTransaction.deleteMany();
    await ProductTransaction.insertMany(response.data);
    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize database' });
  }
});

module.exports = router;
