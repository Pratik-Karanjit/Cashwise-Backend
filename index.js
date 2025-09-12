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
import expenseRoutes from "./src/routes/expense.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(helmet());

const allowedOrigins = [
  "http://localhost:9000",
  "http://localhost:5173", 
  process.env.CLIENT_URL, 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes)

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
