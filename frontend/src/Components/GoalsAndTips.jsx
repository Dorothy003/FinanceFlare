import React, { useEffect, useState } from "react";
import { Lightbulb, Target, Plus, PiggyBank, Trash2 } from "lucide-react";

export default function GoalAndTips({ balance = 0, setBalance, onGoalUpdate }) {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");
  const [contributeAmount, setContributeAmount] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) setGoals(data);
      } catch (err) {
        console.error("Failed to fetch goals", err);
      }
    };
    fetchGoals();
  }, [token]);

  const handleAddGoal = async () => {
    if (goals.length >= 1) {
      alert("You already have a goal. Complete or delete it before adding a new one.");
      return;
    }

    if (!newGoalName || !newGoalAmount || isNaN(newGoalAmount)) {
      alert("Please enter a valid goal name and amount.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/user/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newGoalName,
          target: Number(newGoalAmount),
        }),
      });

      const savedGoal = await res.json();
      setGoals([savedGoal]);
      setShowForm(false);
      setNewGoalName("");
      setNewGoalAmount("");
      onGoalUpdate?.();
    } catch (err) {
      console.error("Error saving goal", err);
    }
  };
const handleContribute = async (goalId) => {
  const goal = goals.find(g => g._id === goalId);
  const amount = Number(contributeAmount);

  if (!goal) return alert("Goal not found.");
  if (goal.saved >= goal.target) return alert("Goal already completed!");
  if (isNaN(amount) || amount <= 0 || amount > balance) return alert("Invalid contribution amount.");

  try {
    const res = await fetch(`http://localhost:5000/api/user/goals/${goalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Show alert only, do not throw error
      alert(data.message || "Failed to contribute.");
      return;
    }

    setGoals((prevGoals) =>
      prevGoals.map((g) => (g._id === goalId ? data.goal : g))
    );
    setContributeAmount("");
    setBalance(data.balance);
    onGoalUpdate?.();
  } catch (err) {
    console.error("Unexpected error:", err); // keep for debugging unexpected cases
  }
};


  const handleDeleteGoal = async (goalId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmDelete) return;
    try {
      await fetch(`http://localhost:5000/api/user/goals/${goalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoals([]);
      onGoalUpdate?.();
    } catch (err) {
      console.error("Failed to delete goal", err);
    }
  };

  const tips = [
    "You spent 25% less on food this month. Great job!",
    "Set a monthly limit for online shopping to save more.",
    "Try reviewing subscriptions – you may find unused ones.",
  ];

  return (
    <div className="bg-[#fefffd] p-6 rounded-2xl shadow-md">
      {/* Goal Tracking */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
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
              className="w-full px-4 py-2 rounded-lg border"
            />
            <input
              type="number"
              placeholder="Goal Amount (₹)"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
            />
            <button
              onClick={handleAddGoal}
              className="w-full bg-purple-600 text-white py-2 rounded-lg"
            >
              Save Goal
            </button>
          </div>
        )}

        {goals.length > 0 ? (
          goals.map((goal, index) => {
            const progress = (goal.saved / goal.target) * 100;
            const isCompleted = goal.saved >= goal.target;

            return (
              <div key={goal._id || index} className="mb-6">
                <p className="text-gray-600 text-sm mb-2">
                  Goal: <strong>{goal.name}</strong><br />
                  Saved: ₹{goal.saved} / ₹{goal.target}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${isCompleted ? "bg-green-600" : "bg-purple-600"
                      }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round(progress)}% completed
                </p>

                {!isCompleted && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <PiggyBank size={20} className="text-pink-600" />
                      <input
                        type="number"
                        placeholder="Contribute ₹"
                        value={contributeAmount}
                        onChange={(e) => setContributeAmount(e.target.value)}
                        className="px-4 py-1 rounded-lg border w-32 text-sm"
                        disabled={isCompleted}
                      />
                      <button
                        onClick={() => handleContribute(goal._id)}
                        className={`px-3 py-1 rounded-lg text-sm text-white ${isCompleted
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600"
                          }`}
                        disabled={isCompleted}
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-900 mt-1">
                      Available Balance: ₹{balance || 0}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => handleDeleteGoal(goal._id)}
                  className="mt-3 flex items-center gap-1 text-red-500 text-sm hover:underline"
                >
                  <Trash2 size={14} /> Delete Goal
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No goals set yet.</p>
        )}
      </div>

      {/* Smart Tips */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-yellow-400 flex items-center gap-2">
          <Lightbulb size={20} /> Smart Tips
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
          {tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
