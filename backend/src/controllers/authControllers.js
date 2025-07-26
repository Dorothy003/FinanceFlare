
import User from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, phoneNumber, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDashboardData = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const income = user.transactions
    .filter((t) => t.amount.startsWith("+"))
    .reduce((sum, t) => sum + parseFloat(t.amount.slice(1)), 0);
  const expense = user.transactions
    .filter((t) => t.amount.startsWith("-"))
    .reduce((sum, t) => sum + parseFloat(t.amount.slice(1)), 0);

  const balance = income - expense;

  res.json({ card: user.card, transactions: user.transactions, income, expense, balance });
};