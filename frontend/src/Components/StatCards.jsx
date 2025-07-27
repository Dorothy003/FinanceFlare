
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function StatCards({ stats }) {
  const { balance = 0, income = 0, expenses = 0 } = stats;

  const statList = [
    {
      label: "Total Balance",
      value: `$${balance.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6 text-blue-500" />,
    },
    {
      label: "Income",
      value: `$${income.toLocaleString()}`,
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
    },
    {
      label: "Expenses",
      value: `$${expenses.toLocaleString()}`,
      icon: <TrendingDown className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statList.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl p-4 shadow-md bg-[#fefffd] text-grey-950 hover:bg-gray-100 hover:text-purple-900 transition-all duration-400"
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
