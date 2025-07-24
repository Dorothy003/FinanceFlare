// src/components/Dashboard.jsx
import React from "react";
import Header from "../Components/Header.jsx";
import StatCards from "../Components/StatCards.jsx";
import Charts from "../Components/Charts.jsx";
import Transactions from "../Components/Transactions.jsx";
import CardInfo from "../Components/CardInfo.jsx";
import GoalsAndTips from "../Components/GoalsAndTips.jsx";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f1f3ff] p-4 ">
             <Header />
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
      <div className="lg:col-span-9 space-y-6">
     
        <StatCards />
        <Charts />
        <Transactions />
      </div>
      <div className="lg:col-span-3 space-y-6">
        <CardInfo />
        <GoalsAndTips />
      </div>
    </div>
    </div>
  );
}
