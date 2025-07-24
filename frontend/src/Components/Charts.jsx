
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
];

export default function Charts() {
  return (
    <div className="bg-[#fefffd] rounded-2xl p-4 shadow-md">
      <h3 className="text-lg font-bold mb-4 text-white">Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="green" strokeWidth={2} />
          <Line type="monotone" dataKey="expenses" stroke="red" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
