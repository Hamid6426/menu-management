require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const dishRoutes = require("./routes/dishRoutes");
const contactRoutes = require("./routes/contactRoutes")

// 1. Configuration
const { NODE_ENV = "development", PORT = 3000, MONGO_URI, CORS_ORIGIN, FRONTEND_URL } = process.env;

const isProduction = NODE_ENV === "production";
const isDevelopment = NODE_ENV === "development";

if (!MONGO_URI) {
  console.error("✖ MONGO_URI is not defined");
  process.exit(1);
}

// 2. Express App & Middleware
const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dev‑only logger
if (isDevelopment) {
  app.use((req, _, next) => {
    console.log(`[DEV] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Prod‑only security & compression
if (isProduction) {
  app.use(helmet());
  app.use(compression());
}

// CORS
const devOrigins = ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"];
const allowedOrigin = isProduction ? CORS_ORIGIN || FRONTEND_URL : undefined;

app.use(
  cors({
    origin: (origin, callback) => {
      if (isProduction) {
        return origin === allowedOrigin ? callback(null, true) : callback(new Error("CORS: Origin not allowed"));
      }
      if (!origin || devOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn("CORS: Blocked origin", origin);
      callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposedHeaders: ["Content-Disposition"],
  })
);

// 3. Routes
app.get("/", (_req, res) => res.json({ message: "Server is running" }));
app.get("/api", (_req, res) => res.json({ message: "API is running" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/dishes", dishRoutes);
app.use('/api/contact', contactRoutes);

// 4. Global Error Handler
app.use((err, _req, res, _next) => {
  if (err.message.startsWith("CORS")) {
    return res.status(403).json({ error: err.message });
  }
  console.error("Error:", err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// 5. DB Connection & Server Start
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✔ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✔ Server listening on port ${PORT} [${NODE_ENV}]`);
    });
  } catch (error) {
    console.error("✖ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
