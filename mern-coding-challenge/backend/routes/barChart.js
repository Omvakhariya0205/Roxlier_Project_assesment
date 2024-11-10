const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');

const router = express.Router();

router.get('/:month', async (req, res) => {
  const month = parseInt(req.params.month, 10) - 1;
  const priceRanges = Array(10).fill(0);

  try {
    const transactions = await ProductTransaction.find({
      dateOfSale: { $gte: new Date(2024, month, 1), $lt: new Date(2024, month + 1, 1) }
    });

    transactions.forEach(({ price }) => {
      const range = Math.min(Math.floor(price / 100), 9);
      priceRanges[range] += 1;
    });

    res.json({ priceRanges });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bar chart data' });
  }
});

module.exports = router;
