import React, { useState, useEffect } from 'react';
import TransactionsTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import { getPriceRangeData } from './api';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('Mar'); // Initial value updated
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRangeData, setPriceRangeData] = useState([]);

  // Fetch transactions data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched transactions:", data); // Debugging log
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch price range data whenever the selected month changes
  useEffect(() => {
    getPriceRangeData(selectedMonth)
      .then(data => {
        setPriceRangeData(data.priceRanges); // Assuming the response has 'priceRanges'
      })
      .catch(error => console.error('Failed to fetch price range data:', error));
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionMonth = new Date(transaction.dateOfSale).toLocaleString('default', { month: 'short' });
    const isInMonth = transactionMonth === selectedMonth;
    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase());
    return isInMonth && matchesSearch;
  });

  console.log("Filtered transactions:", filteredTransactions); // Debugging log

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions Dashboard</h1>

      <select value={selectedMonth} onChange={handleMonthChange} className="border p-2 mb-4">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <TransactionsTable
        transactions={filteredTransactions}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <Statistics selectedMonth={selectedMonth} transactions={transactions} />
      <TransactionsBarChart selectedMonth={selectedMonth} priceRangeData={priceRangeData} />
    </div>
  );
};

export default App;
