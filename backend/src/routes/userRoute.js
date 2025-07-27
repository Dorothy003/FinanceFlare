

import express from 'express';
import { getDashboardData, updateCard, addTransaction, getCard, getChartData } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardData);
router.get('/card', protect, getCard);

router.put('/card', protect, updateCard);
router.post('/transaction', protect, addTransaction);
router.get('/chartdata',protect, getChartData);

export default router;
