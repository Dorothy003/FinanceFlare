import Expense from "../models/Expense.js";
import User from '../models/Users.js';  // ✅ Add this line

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

export const addExpense = async (req, res) => {
  const { name, amount, category, month } = req.body;
  const expense = new Expense({ user: req.user._id, name, amount, category, month });
  const saved = await expense.save();
  res.status(201).json(saved);
};

export const deleteExpense = async (req, res) => {
  const deleted = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
