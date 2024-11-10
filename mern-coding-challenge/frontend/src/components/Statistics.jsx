import React from 'react';

const Statistics = ({ selectedMonth, transactions }) => {
  // Ensure transactions is available
  if (!transactions || transactions.length === 0) {
    return <p>No transactions available</p>;
  }

  // Filter transactions by the selected month
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionMonth = new Date(transaction.dateOfSale).toLocaleString('default', { month: 'short' });
    return transactionMonth === selectedMonth;
  });

  // Calculate total sales and item count for the selected month
  const totalSales = filteredTransactions.reduce((acc, transaction) => acc + transaction.price, 0);
  const totalItems = filteredTransactions.length;

  return (
    <div>
      <h2>Statistics for {selectedMonth}</h2>
      <p>Total Sales: ${totalSales.toFixed(2)}</p>
      <p>Total Items: {totalItems}</p>
    </div>
  );
};

export default Statistics;
