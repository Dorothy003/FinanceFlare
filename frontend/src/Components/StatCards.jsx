// src/components/StatCards.jsx
import React from "react";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  {
    label: "Total Balance",
    value: "$24,095",
    icon: <DollarSign className="w-6 h-6 text-blue-500" />,
  },
  {
    label: "Income",
    value: "$15,550",
    icon: <TrendingUp className="w-6 h-6 text-green-500" />,
  },
  {
    label: "Expenses",
    value: "$8,545",
    icon: <TrendingDown className="w-6 h-6 text-red-500" />,
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl p-4 shadow-md bg-[#fefffd] text-grey-950 transition-all duration-400 hover:bg-gray-100 hover:text-purple-900`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{stat.label}</p>
            {stat.icon}
          </div>
          <h2 className="text-2xl font-bold mt-2">{stat.value}</h2>
        </div>
      ))}
    </div>
  );
}
