const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');

const router = express.Router();

router.get('/:month', async (req, res) => {
  const month = parseInt(req.params.month, 10) - 1;

  try {
    const categories = await ProductTransaction.aggregate([
      { $match: { dateOfSale: { $gte: new Date(2024, month, 1), $lt: new Date(2024, month + 1, 1) } } },
      { $group: { _id: "$category", itemCount: { $sum: 1 } } }
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve pie chart data' });
  }
});

module.exports = router;
