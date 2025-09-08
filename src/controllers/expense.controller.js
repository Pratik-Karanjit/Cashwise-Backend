import { HTTP_STATUS } from "../config/constants.js";
import successResponse from "../utils/successResponse.js";
import errorResponse from "../utils/errorResponse.js";
import Expense from "../models/Expense.model.js";
import User from "../models/User.model.js"

export const groupExpense = async (req, res) => {
  try {
    const expenseData = req.body;
    console.log("expense data is*&&&&&&&&&&&&&&&&&&&:", expenseData);
    
    if (expenseData.expenses && Array.isArray(expenseData.expenses)) {
      const expensesWithUser = expenseData.expenses.map(expense => ({
        ...expense,
        createdBy: req.user ? req.user._id : undefined,
        transactions: expenseData.transactions || [] 
      }));
      
      const savedExpenses = await Expense.insertMany(expensesWithUser);
      await User.findByIdAndUpdate(req.user.id, {hasExpenses: true})
      return successResponse(res, HTTP_STATUS.CREATED, 'Expenses saved successfully!', {
        expenses: savedExpenses,
        transactions: expenseData.transactions || []
      });
    } 
    else if (Array.isArray(expenseData)) {
      const expensesWithUser = expenseData.map(expense => ({
        ...expense,
        createdBy: req.user ? req.user._id : undefined,
        transactions: expense.transactions || []
      }));
      
      const savedExpenses = await Expense.insertMany(expensesWithUser);
      await User.findByIdAndUpdate(req.user.id, {hasExpenses: true})

      return successResponse(res, HTTP_STATUS.CREATED, 'Expenses saved successfully!', savedExpenses);
    } 
    // Handle single expense
    else {
      const expense = new Expense({
        ...expenseData,
        createdBy: req.user ? req.user._id : undefined,
        transactions: expenseData.transactions || []
      });
      await expense.save();
      await User.findByIdAndUpdate(req.user.id, {hasExpenses: true})

      return successResponse(res, HTTP_STATUS.CREATED, 'Expense saved successfully!', expense);
    }
  } catch (err) {
    console.error("Error saving expense:", err);
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Error saving expense', err.message);
  }
};

export const getExpenses = async (req, res) => {
  try {
    const query = req.user ? { createdBy: req.user._id } : {};
    const expenses = await Expense.find(query).sort({ createdAt: -1 });
    return successResponse(res, HTTP_STATUS.OK, 'Expenses retrieved successfully!', expenses);
  } catch (err) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Error retrieving expenses', err.message);
  }
};