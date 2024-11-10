// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust based on your server URL

// Function to fetch transactions for a selected month
export const getTransactions = (month, searchQuery, page = 1) => {
  return axios.get(`${BASE_URL}/transactions`, {
    params: {
      month,
      search: searchQuery,
      page,
    },
  });
};

// Function to fetch transaction statistics
export const getStatistics = (month) => {
  return axios.get(`${BASE_URL}/statistics`, { params: { month } });
};

// Function to fetch price range data
export const getPriceRangeData = (month) => {
    return axios.get(`${BASE_URL}/price-range`, { params: { month } })
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching price range data:', error);
        throw error;
      });
  };
      