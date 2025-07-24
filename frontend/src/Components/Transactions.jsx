// Your existing imports
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Netflix", date: "2025-07-19", amount: "-₹499", type: "Subscription" },
    { id: 2, name: "Salary", date: "2025-07-15", amount: "+₹50,000", type: "Income" },
    { id: 3, name: "Amazon", date: "2025-07-14", amount: "-₹1,299", type: "Shopping" },
    { id: 4, name: "Zomato", date: "2025-07-13", amount: "-₹350", type: "Food" },
    { id: 5, name: "Upwork", date: "2025-07-10", amount: "+₹12,000", type: "Freelance" },
     { id: 5, name: "Upwork", date: "2025-07-10", amount: "+₹12,000", type: "Freelance" },
      { id: 5, name: "Upwork", date: "2025-07-10", amount: "+₹12,000", type: "Freelance" },
       { id: 5, name: "Upwork", date: "2025-07-10", amount: "+₹12,000", type: "Freelance" },
        { id: 5, name: "Upwork", date: "2025-07-10", amount: "+₹12,000", type: "Freelance" },
  ]);

  const [newTxn, setNewTxn] = useState({ name: "", amount: "", type: "" });
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = () => {
    if (!newTxn.name || !newTxn.amount || !newTxn.type) {
      alert("Please fill all fields.");
      return;
    }

    const newTransaction = {
      ...newTxn,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };

    setTransactions([newTransaction, ...transactions]);
    setNewTxn({ name: "", amount: "", type: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((txn) => txn.id !== id));
  };

  const downloadCSV = () => {
    if (!filteredTransactions.length) {
      alert("No transactions to export.");
      return;
    }

    const headers = ["Name", "Date", "Amount", "Type"];
    const rows = filteredTransactions.map((txn) =>
      [txn.name, txn.date, txn.amount, txn.type].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesType = filterType ? txn.type === filterType : true;
    const matchesSearch = txn.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const transactionTypes = [...new Set(transactions.map((txn) => txn.type))];

  return (
    <div className="bg-[#fefffd] p-6 rounded-2xl shadow-md mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-900">Recent Transactions</h2>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-3 py-1.5 border rounded-md text-sm bg-white dark:bg-[#fefffd]  text-black dark:text-black border-gray-300 dark:border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2 py-1.5 border rounded-md text-sm bg-white dark:bg-[#fefffd] text-black dark:text-black border-gray-300 dark:border-gray-600"
          >
            <option value="">All Types</option>
            {transactionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#fefffd] text-gray-900 dark:bg-[#fefffd] dark:text-black  border border-gray-300 dark:border-gray-600 rounded-lg text-sm cursor-pointer"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 space-y-2 text-white">
          <input
            type="text"
            placeholder="Transaction Name"
            value={newTxn.name}
            onChange={(e) => setNewTxn({ ...newTxn, name: e.target.value })}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-white"
          />
          <input
            type="text"
            placeholder="Amount (prefix + or -)"
            value={newTxn.amount}
            onChange={(e) => setNewTxn({ ...newTxn, amount: e.target.value })}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-100 bg-white dark:bg-gray-900 text-sm text-white"
          />
          <input
            type="text"
            placeholder="Type (e.g. Food, Salary, etc)"
            value={newTxn.type}
            onChange={(e) => setNewTxn({ ...newTxn, type: e.target.value })}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-white"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Add Transaction
          </button>
        </div>
      )}

      {/* Scrollable Table */}
      <div className="overflow-y-auto max-h-64 border border-gray-200 dark:border-gray-900 rounded-md">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white dark:bg-purple-900 z-10">
            <tr className="text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr key={txn.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 px-3 text-gray-800 dark:text-gray-900">{txn.name}</td>
                <td className="py-2 px-3 text-gray-600 dark:text-gray-900">{txn.date}</td>
                <td
                  className={`py-2 px-3 font-medium ${
                    txn.amount.startsWith("-") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {txn.amount}
                </td>
                <td className="py-2 px-3 text-gray-700 dark:text-gray-900">{txn.type}</td>
                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => handleDelete(txn.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
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

      {/* Download Button */}
      <div className="text-right">
        <button
          onClick={downloadCSV}
          className="mt-3 inline-block px-4 py-2 text-sm bg-purple-800 text-white rounded hover:bg-purple-900 transition"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}
