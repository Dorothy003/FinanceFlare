
import express from 'express';
import { getIncomes, addIncome, deleteIncome } from '../controllers/incomeController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getIncomes);
router.post('/', protect, addIncome);
router.delete('/:id', protect, deleteIncome);

export default router;
