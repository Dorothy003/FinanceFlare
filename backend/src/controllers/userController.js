
import Income from '../models/Income.js';
import Expense from '../models/Expense.js';
import User from '../models/Users.js';
import moment from 'moment';
export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    const incomes = await Income.find({ user: req.user.id });
    const expenses = await Expense.find({ user: req.user.id });
    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const initialBalance = user.card?.balance || 0;
    const isIncomeOrExpensePresent = totalIncome > 0 || totalExpense > 0;
    const totalBalance = isIncomeOrExpensePresent
      ? initialBalance + totalIncome - totalExpense
      : initialBalance;
    res.json({
      card: user.card || {},
      totalIncome,
      totalExpense,
      totalBalance,
      transactions: [],
      incomes,      // send raw incomes
      expenses,
    });

  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

export const getCard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ card: user.card || {} });
  } catch (err) {
    console.error("Error fetching card:", err);
    res.status(500).json({ message: "Failed to fetch card" });
  }
};

export const updateCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const cardData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "card.cardNumber": cardData.cardNumber,
          "card.cvv": cardData.cvv,
          "card.expiryDate": cardData.expiryDate,
          "card.cardType": cardData.cardType,
          "card.balance": cardData.balance,
        },
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ card: updatedUser.card });

  } catch (error) {
    console.error("Update card error:", error);
    res.status(500).json({ message: 'Failed to update card' });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, category, amount, note, date } = req.body;

    const newTransaction = {
      type,
      category,
      amount,
      note,
      date: date || new Date(),
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { transactions: newTransaction } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(201).json({ transactions: user.transactions });

  } catch (error) {
    console.error("Add transaction error:", error);
    res.status(500).json({ message: 'Failed to add transaction' });
  }
};



export const getChartData = async (req, res) => {
  try {
    const userId = req.user._id;

    const incomeData = await Income.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$month",
          totalIncome: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } }
    ]);

    const expenseData = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$month",
          totalExpense: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({ income: incomeData, expense: expenseData });
  } catch (error) {
    console.error("❌ Error fetching chart data:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
