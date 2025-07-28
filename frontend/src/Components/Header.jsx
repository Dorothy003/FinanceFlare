// src/components/Header.jsx
import React, { useState } from "react";
import { Bell, Menu, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";
export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Income", path: "/income" },
    { label: "Expense", path: "/expenses" },
    { label: "Log out", path: "/" }
  ];

  const handleMenuClick = (item) => {
    setSidebarOpen(false);
     if (item.label === "Log out") {
    // Remove the token (and other user-related localStorage if any)
    localStorage.removeItem("token");
  console.log("Token after logout:", localStorage.getItem("token"));
    // Redirect to login
    navigate("/");
  } else {
    navigate(item.path);
  }
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
          <User className="h-5 w-5 text-[#191919] cursor-pointer" />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#191919]/90 shadow-lg transform transition-transform duration-300 z-50 ${
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
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.label}
                onClick={() => handleMenuClick(item)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-purple-900 text-white"
                    : "text-gray-300 hover:bg-gray-500"
                }`}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
