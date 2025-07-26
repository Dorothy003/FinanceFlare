
import Income from '../models/Income.js';
import Expense from '../models/Expense.js';

export const getDashboardData = async (req, res) => {
  try {
    const user = req.user;

    const income = await Income.find({ user: user._id });
    const expenses = await Expense.find({ user: user._id });

    const totalIncome = income.reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);

    res.json({
      card: user.card,
      transactions: user.transactions.slice(-5).reverse(),
      totalBalance: user.card?.balance || 0,
      totalIncome,
      totalExpense,
      totalInterest: (totalIncome - totalExpense) * 0.05,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCard = async (req, res) => {
  try {
    const user = req.user;
    user.card = req.body;
    await user.save();
    res.json({ card: user.card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const user = req.user;
    const txn = req.body;
    user.transactions.unshift(txn);

    const amt = parseFloat(txn.amount);
    if (!isNaN(amt)) user.card.balance += amt;

    await user.save();
    res.json({ message: 'Transaction added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
