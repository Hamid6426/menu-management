  const express = require("express");
  const cors = require("cors");
  const mongoose = require("mongoose");
  const authRoutes = require("./routes/authRoutes");
  const userRoutes = require("./routes/userRoutes");
  const restaurantRoutes = require("./routes/restaurantRoutes");
  const dishRoutes = require("./routes/dishRoutes");
  require("dotenv").config();

  // Initialize Express app
  const app = express();

  // Middleware
  app.use(express.json());

  // CORS Middleware
  app.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:5174", // when using both vite projects
          "http://localhost:4173", // vite preview (staging)
          "http://localhost:5500",
          "http://127.0.0.1:5500",
          "https://menu-management-frontend-gu7f.onrender.com", // frontend production
          "https://menu-management-lsqs.onrender.com", // backend production
          process.env.BACKEND_URL,
          process.env.FRONTEND_URL,
        ];
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      exposedHeaders: ["Content-Disposition"],
    })
  );

  // Define Test API Routes
  app.get("/", (_req, res) => {
    res.json({ message: "Hello, This is menu-management web app server!" });
  });
  app.get("/api", (_req, res) => {
    res.json({ message: "Hello, This is menu-management web app API route!" });
  });

  // Authentication routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/restaurants", restaurantRoutes);
  app.use("/api/dishes", dishRoutes);

  const PORT = process.env.PORT || 3000;

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully");
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("MongoDB Connection Error:", err);
      process.exit(1); // Exit if unable to connect
    });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected to the database.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose is disconnected from the database.");
  });
