// src/components/GoalAndTips.jsx
import React, { useState } from "react";
import { Lightbulb, Target, Plus } from "lucide-react";

export default function GoalAndTips() {
  const [goalName, setGoalName] = useState("Buy a new Laptop");
  const [goalAmount, setGoalAmount] = useState(60000);
  const [savedAmount, setSavedAmount] = useState(35000);
  const [showForm, setShowForm] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");

  const progress = (savedAmount / goalAmount) * 100;

  const tips = [
    "You spent 25% less on food this month. Great job!",
    "Set a monthly limit for online shopping to save more.",
    "Try reviewing subscriptions – you may find unused ones.",
  ];

  const handleAddGoal = () => {
    if (!newGoalName || !newGoalAmount || isNaN(newGoalAmount)) {
      alert("Please enter a valid goal name and amount.");
      return;
    }
    setGoalName(newGoalName);
    setGoalAmount(Number(newGoalAmount));
    setSavedAmount(0); // reset saved amount for new goal
    setShowForm(false);
    setNewGoalName("");
    setNewGoalAmount("");
  };

  return (
    <div className="bg-[#fefffd] p-6 rounded-2xl shadow-md">
      {/* Goal Tracking */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-[#191919] flex items-center gap-2">
            <Target size={20} /> Goal Tracking
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-purple-600 hover:underline flex items-center gap-1"
          >
            <Plus size={16} /> Add Goal
          </button>
        </div>

        {showForm && (
          <div className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="Goal Name"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
            />
            <input
              type="number"
              placeholder="Goal Amount (₹)"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
            />
            <button
              onClick={handleAddGoal}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Goal
            </button>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-9500 text-sm mb-2">
          Goal: <strong>{goalName}</strong><br />
          Saved: ₹{savedAmount} / ₹{goalAmount}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-purple-600 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-900 mt-1">
          {Math.round(progress)}% completed
        </p>
      </div>

      {/* Smart Tips */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-yellow-400 flex items-center gap-2">
          <Lightbulb size={20} /> Smart Tips
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-900 text-sm">
          {tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
