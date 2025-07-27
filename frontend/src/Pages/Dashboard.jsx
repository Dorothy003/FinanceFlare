import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import StatCards from '../Components/StatCards';
import Charts from '../Components/Charts';
import Transactions from '../Components/Transactions';
import CardInfo from '../Components/CardInfo';
import GoalsAndTips from '../Components/GoalsAndTips';

export default function Dashboard() {
  const [card, setCard] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    interest: 0,
    expenses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [dashboardRes, chartRes] = await Promise.all([
          fetch('http://localhost:5000/api/user/dashboard', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/user/chartdata', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const dashboardData = await dashboardRes.json();
        const chartRawData = await chartRes.json();

        setCard(dashboardData.card || {});
        setTransactions(dashboardData.transactions || []);
        setStats({
          balance: dashboardData.totalBalance || 0,
          income: dashboardData.totalIncome || 0,
          interest: dashboardData.totalInterest || 0,
          expenses: dashboardData.totalExpense || 0,
        });

        const mergedChartData = {};

        
        chartRawData.income.forEach((item) => {
          const month = item._id;
          if (!mergedChartData[month]) mergedChartData[month] = { month };
          mergedChartData[month].income = item.totalIncome;
        });

      
        chartRawData.expense.forEach((item) => {
          const month = item._id;
          if (!mergedChartData[month]) mergedChartData[month] = { month };
          mergedChartData[month].expense = item.totalExpense;
        });

    
        const monthOrder = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const finalChartData = Object.values(mergedChartData)
          .map((item) => ({
            month: item.month,
            income: item.income || 0,
            expense: item.expense || 0,
          }))
          .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

        setChartData(finalChartData);

      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3ff] p-4">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
        <div className="lg:col-span-9 space-y-6">
          <StatCards stats={stats} />
          <Charts data={chartData} />
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
          />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <CardInfo
            card={card}
            setCard={setCard}
            onBalanceChange={(newBalance) =>
              setStats((prev) => ({
                ...prev,
                balance: parseFloat(newBalance),
              }))
            }
          />
          <GoalsAndTips />
        </div>
      </div>
    </div>
  );
}
