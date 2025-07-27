// controllers/incomeController.js
import Income from '../models/Income.js';

export const getIncomes = async (req, res) => {
  const incomes = await Income.find({ user: req.user._id });
  res.json(incomes);
};

export const addIncome = async (req, res) => {
  const { name, amount, month } = req.body;
  const income = new Income({
    user: req.user._id,
    name,
    amount,
    month,
  });
  const saved = await income.save();
  res.status(201).json(saved);
};

export const deleteIncome = async (req, res) => {
  const income = await Income.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!income) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
