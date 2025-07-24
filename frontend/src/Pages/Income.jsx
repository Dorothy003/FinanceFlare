// src/Pages/Income.jsx
import React, { useState } from "react";
import Header from "../Components/Header";
import { Bar } from "react-chartjs-2";
import { saveAs } from "file-saver";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Income() {
  const [incomeData, setIncomeData] = useState([
    { id: 1, name: "Salary", amount: 5000, month: "Jan" },
    { id: 2, name: "Freelance", amount: 3000, month: "Feb" },
    { id: 3, name: "Consulting", amount: 4500, month: "Mar" },
  ]);

  const [newIncome, setNewIncome] = useState({ name: "", amount: "", month: "" });
  const [showForm, setShowForm] = useState(false);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const incomeByMonth = months.map((month) => {
    const total = incomeData
      .filter((item) => item.month === month)
      .reduce((sum, item) => sum + Number(item.amount), 0);
    return total;
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Income (₹)",
        data: incomeByMonth,
        backgroundColor: "#a855f7",
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  const handleAddIncome = () => {
    if (!newIncome.name || !newIncome.amount || !newIncome.month) {
      alert("Please fill in all fields.");
      return;
    }

    const newEntry = {
      ...newIncome,
      id: Date.now(),
      amount: Number(newIncome.amount),
    };

    setIncomeData([...incomeData, newEntry]);
    setNewIncome({ name: "", amount: "", month: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setIncomeData(incomeData.filter((item) => item.id !== id));
  };

  const handleDownloadCSV = () => {
    const csv = [
      ["Name", "Amount", "Month"],
      ...incomeData.map((item) => [item.name, item.amount, item.month]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "income.csv");
  };

  return (
    <div className="min-h-screen bg[#f1f3ff] text-white p-6">
      <Header />

      {/* Bar Graph with Add & Download Button */}
      <div className="bg-[#fefffd] p-6 rounded-lg shadow-md mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-500">Monthly Income Overview</h2>
          <div className="flex gap-4">
            <button
              onClick={handleDownloadCSV}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Download CSV
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
            >
              {showForm ? "Cancel" : "Add"}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Income Name"
              value={newIncome.name}
              onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
              className="px-3 py-2 rounded bg-gray-100 text-black w-full md:w-1/4"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newIncome.amount}
              onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              className="px-3 py-2 rounded bg-gray-100 text-black w-full md:w-1/4"
            />
            <select
              value={newIncome.month}
              onChange={(e) => setNewIncome({ ...newIncome, month: e.target.value })}
              className="px-3 py-2 rounded bg-gray-100 text-black w-full md:w-1/4"
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <button
              onClick={handleAddIncome}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Add Income
            </button>
          </div>
        )}

        <div className="h-[300px] w-full bg-[#fefffd]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Income List with Delete */}
      <div className="bg-[#fefffd] p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-purple-500">Income Transactions</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {incomeData.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b border-gray-300 pb-2"
            >
              <div className="text-gray-900">
                {item.name} ({item.month})
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-500 font-medium">+₹{item.amount}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-white bg-green-500 px-2 py-1 rounded hover:bg-green-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {incomeData.length === 0 && (
            <li className="text-gray-400">No income added yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
