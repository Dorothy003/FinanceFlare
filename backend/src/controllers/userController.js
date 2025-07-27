
import Income from '../models/Income.js';
import Expense from '../models/Expense.js';
import User from '../models/Users.js';
export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      card: user.card || {},
      totalIncome: 0,
      totalExpense: 0,
      totalInterest: 0,
      totalBalance: user.card?.balance || 0,
      transactions: []
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
