import React from 'react';

const TransactionsTable = ({ transactions, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearchChange}
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-3 border-b font-semibold">Image</th>
            <th className="p-3 border-b font-semibold">Title</th>
            <th className="p-3 border-b font-semibold">Description</th>
            <th className="p-3 border-b font-semibold">Price</th>
            <th className="p-3 border-b font-semibold">Category</th>
            <th className="p-3 border-b font-semibold">Date of Sale</th>
            <th className="p-3 border-b font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="p-3 border-b">
                <img
                  src={transaction.image}
                  alt={transaction.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-3 border-b">{transaction.title}</td>
              <td className="p-3 border-b">{transaction.description}</td>
              <td className="p-3 border-b">${transaction.price}</td>
              <td className="p-3 border-b">{transaction.category}</td>
              <td className="p-3 border-b">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td className="p-3 border-b">{transaction.sold ? 'Sold' : 'Not Sold'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
