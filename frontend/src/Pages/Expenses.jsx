import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { saveAs } from "file-saver";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function Expense({ onBalanceUpdate }) {
  const [expenseData, setExpenseData] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "", category: "", month: "" });
  const [showForm, setShowForm] = useState(false);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expense", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setExpenseData(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  // Line chart data
  const expenseByMonth = months.map((month) => {
    return expenseData
      .filter((item) => item.month === month)
      .reduce((sum, item) => sum + Number(item.amount), 0);
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: expenseByMonth,
        fill: false,
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
        tension: 0.3,
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
const handleAddExpense = async () => {
  const { name, amount, category, month } = newExpense;
  if (!name || !amount || !category || !month) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/expense", newExpense, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setExpenseData((prev) => [...prev, res.data]);
    setNewExpense({ name: "", amount: "", category: "", month: "" });
    setShowForm(false);

    onBalanceUpdate?.();
  } catch (err) {
    console.error("Failed to add expense:", err);
  }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expense/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExpenseData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const handleDownloadCSV = () => {
    const csv = [
      ["Name", "Amount", "Category", "Month"],
      ...expenseData.map((e) => [e.name, e.amount, e.category, e.month]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "expenses.csv");
  };

  return (
    <div className="min-h-screen bg-[#f1f3ff] text-white p-6">
      <Header />

      {/* Line Graph and Add Button */}
      <div className="bg-[#fefffd] p-6 rounded-lg shadow-md mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-500">Monthly Expenses Overview</h2>
          <div className="flex gap-4">
            <button
              onClick={handleDownloadCSV}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Download CSV
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
            >
              {showForm ? "Cancel" : "Add"}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Expense Name"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              className="px-3 py-2 rounded bg-gray-100 text-black w-full md:w-1/5"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="px-3 py-2 rounded bg-gray-100 text-black w-full md:w-1/5"
            />
            <input
              type="text"
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="px-3 py-2 rounded bg-gray-100 text-black w-full md:w-1/5"
            />
            <select
              value={newExpense.month}
              onChange={(e) => setNewExpense({ ...newExpense, month: e.target.value })}
              className="px-3 py-2 rounded bg-gray-100 text-black w-full md:w-1/5"
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <button
              onClick={handleAddExpense}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Add Expense
            </button>
          </div>
        )}

        <div className="h-[300px] w-full bg-[#fefffd]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-[#fefffd] p-6 rounded-lg shadow-md text-black">
        <h2 className="text-lg font-semibold mb-4 text-red-500">Expense Transactions</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {expenseData.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border-b border-gray-300 pb-2"
            >
              <div>
                {item.name} ({item.category}, {item.month})
              </div>
              <div className="flex items-center gap-4">
                <span className="text-red-500 font-medium">-₹{item.amount}</span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {expenseData.length === 0 && (
            <li className="text-gray-400">No expenses added yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
