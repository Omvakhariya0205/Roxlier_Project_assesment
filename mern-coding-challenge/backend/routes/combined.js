const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:month', async (req, res) => {
  const month = req.params.month;

  try {
    const [stats, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:5000/api/statistics/${month}`),
      axios.get(`http://localhost:5000/api/bar-chart/${month}`),
      axios.get(`http://localhost:5000/api/pie-chart/${month}`)
    ]);

    res.json({ stats: stats.data, barChart: barChart.data, pieChart: pieChart.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve combined data' });
  }
});

module.exports = router;
