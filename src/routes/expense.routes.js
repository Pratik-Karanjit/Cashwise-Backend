import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { groupExpense, getExpenses } from '../controllers/expense.controller.js';

const expenseRoutes = express.Router();

expenseRoutes.post("/group", protect, groupExpense);
expenseRoutes.get("/group", protect, getExpenses);

export default expenseRoutes;