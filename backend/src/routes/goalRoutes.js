import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goalController.js';

const router = express.Router();

router.get('/', protect, getGoals);
router.post('/', protect, addGoal);
router.put('/:goalId', protect, updateGoal);      // update by array index
router.delete('/:goalId', protect, deleteGoal);   // delete by index

export default router;
