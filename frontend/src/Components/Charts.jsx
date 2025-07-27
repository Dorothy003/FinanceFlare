
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Charts({ data }) {
  const sortedData = [...data].sort((a, b) =>
    new Date(`1 ${a.month}`) - new Date(`1 ${b.month}`)
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Income vs Expense</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#F44336" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
