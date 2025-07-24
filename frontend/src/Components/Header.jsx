// src/components/Header.jsx
import React, { useState } from "react";
import { Search, Bell, Menu, X, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Income", path: "/income" },
    { label: "Expense", path: "/expenses" },
    { label: "Log out", path: "/" }
  ];

  const handleMenuClick = (item) => {
    setActiveTab(item.label);
    setSidebarOpen(false); // close sidebar
    navigate(item.path);
  };

  return (
    <div className="relative w-full border-b border-[#191919] pb-2">
      {/* Header Content */}
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <Menu
            className="text-[#191919] cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
          <h1 className="text-2xl font-bold text-[#191919]">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 cursor-pointer text-[#191919]" />
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-9 h-9 rounded-full"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#191919] shadow-lg transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-gray-100">Menu</h2>
          <ArrowLeft
            className="text-white cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        <ul className="p-4 space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleMenuClick(item)}
              className={`cursor-pointer px-4 py-2 rounded-lg ${
                activeTab === item.label
                  ? "bg-blue-900 text-white"
                  : "text-gray-300 hover:bg-gray-500"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
