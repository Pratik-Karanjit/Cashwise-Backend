import dotenv from "dotenv";
import http from "http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Security headers
app.use(helmet());

// Accept any origin (for now, no credentials)
app.use(cors()); // <-- THIS ACCEPTS ANY ORIGIN

// Logging
app.use(morgan("dev"));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
