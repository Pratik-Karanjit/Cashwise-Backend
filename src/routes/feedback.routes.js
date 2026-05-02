import express from 'express';
import { saveContactUs } from '../controllers/feedback.controller.js';

const feedbackRoutes = express.Router();

feedbackRoutes.post("/sendFeedback", saveContactUs);

export default feedbackRoutes;