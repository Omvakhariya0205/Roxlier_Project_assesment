import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getPriceRangeData } from '../api';  // Assuming this is correctly pointing to the API function
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch price range data based on the selected month
    getPriceRangeData(selectedMonth)
      .then((response) => {
        const priceRanges = response.data?.priceRanges || [];  // Ensuring safe access to the response data

        // Ensure the priceRanges array has exactly 10 elements (corresponding to each range)
        if (priceRanges.length !== 10) {
          console.warn('Unexpected number of price range data points:', priceRanges.length);
        }

        setChartData({
          labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901+'],
          datasets: [{
            label: 'Number of Items',
            data: priceRanges,  // Make sure that this matches the expected data array from the response
            backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Customizable chart color
          }],
        });
      })
      .catch((error) => console.error('Error fetching price range data:', error));
  }, [selectedMonth]);  // Re-fetch data whenever the selectedMonth changes

  if (!chartData) return <p>Loading chart...</p>;  // Show loading text while waiting for data

  return (
    <div>
      <h3>Price Range Distribution for {selectedMonth}</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionsBarChart;
