

import express from 'express';
import { getDashboardData, updateCard, addTransaction } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardData);
router.put('/card', protect, updateCard);
router.post('/transaction', protect, addTransaction);

export default router;
