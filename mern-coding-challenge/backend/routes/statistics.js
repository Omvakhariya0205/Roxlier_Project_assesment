const express = require('express');
const ProductTransaction = require('../models/ProductTransaction');

const router = express.Router();

router.get('/:month', async (req, res) => {
  const month = parseInt(req.params.month, 10) - 1;

  try {
    const transactions = await ProductTransaction.find({
      dateOfSale: { $exists: true, $gte: new Date(2024, month, 1), $lt: new Date(2024, month + 1, 1) }
    });
    
    const totalSales = transactions.reduce((sum, transaction) => transaction.sold ? sum + transaction.price : sum, 0);
    const soldItems = transactions.filter(t => t.sold).length;
    const notSoldItems = transactions.filter(t => !t.sold).length;
    
    res.json({ totalSales, soldItems, notSoldItems });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve statistics' });
  }
});

module.exports = router;
