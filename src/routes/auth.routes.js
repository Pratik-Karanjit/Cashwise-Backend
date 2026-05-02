import express from 'express';
import { registerUser, loginUser, logoutUser, testFunc, healthCheck } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/logout', protect, logoutUser);
authRoutes.get("/testApi", protect, testFunc)
authRoutes.get("/health", healthCheck)

export default authRoutes;
