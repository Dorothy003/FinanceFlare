import React, { useState } from "react";
import { Trash2, Download } from "lucide-react";

export default function TransactionsTable({ transactions = [], refresh }) {
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesType = filterType ? txn.type === filterType : true;
    const matchesSearch = txn.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const transactionTypes = [...new Set(transactions.map((txn) => txn.type))];

  const handleDownloadCSV = () => {
    const headers = ["Name", "Date", "Amount", "Type"];
    const rows = filteredTransactions.map((txn) => [
      txn.name,
      txn.date,
      txn.amount,
      txn.type
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#fefffd] p-6 rounded-2xl shadow-md mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
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
            onClick={() => setShowAll(prev => !prev)}
            className="px-4 py-1.5 bg-[#f5f5f5] text-gray-900 border border-gray-300 rounded-lg text-sm cursor-pointer"
          >
            {showAll ? "Show Less" : "See All Transactions"}
          </button>
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1 px-4 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-green-600"
          >
            <Download size={16} />
            Download CSV
          </button>
        </div>
      </div>

      <div className={`overflow-y-auto ${showAll ? "max-h-none" : "max-h-64"} border rounded-md`}>
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
