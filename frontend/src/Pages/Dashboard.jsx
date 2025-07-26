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
  const [stats, setStats] = useState({ balance: 0, income: 0, interest: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCard(data.card);
      setTransactions(data.transactions);
      setStats({
        balance: data.totalBalance,
        income: data.totalIncome,
        interest: data.totalInterest,
        expenses: data.totalExpense || 0, 
      });
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f3ff] p-4 ">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
        <div className="lg:col-span-9 space-y-6">
          <StatCards stats={stats} />
          <Charts />
          <Transactions transactions={transactions} setTransactions={setTransactions} />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <CardInfo card={card} setCard={setCard} />
          <GoalsAndTips />
        </div>
      </div>
    </div>
  );
}