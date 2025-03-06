import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
db();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allows all origins
    credentials: true,
  })
);

// Define Test API Routes
app.get("/", (_req, res) => {
  res.json({ message: "Hello, This is qr-menu Backend!" });
});
app.get("/api", (_req, res) => {
  res.json({ message: "Hello, This is qr-menu API!" });
});

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;