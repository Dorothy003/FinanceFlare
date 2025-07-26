
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function TransactionsTable({ transactions = [], refresh }) {
  const [newTxn, setNewTxn] = useState({ name: "", amount: "", type: "" });
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = async () => {
    if (!newTxn.name || !newTxn.amount || !newTxn.type) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await fetch('/api/user/transaction', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify(newTxn),
});


      setNewTxn({ name: "", amount: "", type: "" });
      setShowForm(false);
      refresh();
    } catch (err) {
      console.error("Error adding transaction", err);
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesType = filterType ? txn.type === filterType : true;
    const matchesSearch = txn.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const transactionTypes = [...new Set(transactions.map((txn) => txn.type))];

  return (
    <div className="bg-[#fefffd] p-6 rounded-2xl shadow-md mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-3 py-1.5 border rounded-md text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2 py-1.5 border rounded-md text-sm"
          >
            <option value="">All Types</option>
            {transactionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#f5f5f5] text-gray-900 border border-gray-300 rounded-lg text-sm cursor-pointer"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2">
          <input
            type="text"
            placeholder="Transaction Name"
            value={newTxn.name}
            onChange={(e) => setNewTxn({ ...newTxn, name: e.target.value })}
            className="w-full px-3 py-2 rounded border"
          />
          <input
            type="text"
            placeholder="Amount (prefix + or -)"
            value={newTxn.amount}
            onChange={(e) => setNewTxn({ ...newTxn, amount: e.target.value })}
            className="w-full px-3 py-2 rounded border"
          />
          <input
            type="text"
            placeholder="Type (e.g. Food, Salary)"
            value={newTxn.type}
            onChange={(e) => setNewTxn({ ...newTxn, type: e.target.value })}
            className="w-full px-3 py-2 rounded border"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Add Transaction
          </button>
        </div>
      )}

      <div className="overflow-y-auto max-h-64 border rounded-md">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.id || txn.date + txn.name} className="border-b">
                <td className="py-2 px-3">{txn.name}</td>
                <td className="py-2 px-3">{txn.date}</td>
                <td className={`py-2 px-3 font-medium ${txn.amount.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
                  {txn.amount}
                </td>
                <td className="py-2 px-3">{txn.type}</td>
                <td className="py-2 px-3 text-center">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No matching transactions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
