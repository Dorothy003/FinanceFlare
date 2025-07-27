

import express from 'express';
import { getDashboardData, updateCard, addTransaction, getCard } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardData);
router.get('/card', protect, getCard);

router.put('/card', protect, updateCard);
router.post('/transaction', protect, addTransaction);

export default router;
