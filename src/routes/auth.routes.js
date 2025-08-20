import express from 'express';
import { registerUser, loginUser, logoutUser, testFunc } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/logout', protect, logoutUser);
authRoutes.get("/testApi", protect, testFunc)

export default authRoutes;
