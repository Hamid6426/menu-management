  require("dotenv").config();
  const express       = require("express");
  const cors          = require("cors");
  const helmet        = require("helmet");
  const compression   = require("compression");
  const mongoose      = require("mongoose");
  const authRoutes    = require("./routes/authRoutes");
  const userRoutes    = require("./routes/userRoutes");
  const restaurantRoutes = require("./routes/restaurantRoutes");
  const dishRoutes    = require("./routes/dishRoutes");

  const app    = express();
  const isProd = process.env.NODE_ENV === "production";
  const PORT   = process.env.PORT || 3000;

  //─── MIDDLEWARE ────────────────────────────────────────────────────────────────
  // parse JSON bodies
  app.use(express.json());

  // security & performance
  if (isProd) {
    // only in production
    app.use(helmet());
    app.use(compression());
  } else {
    // only in development
    app.use((req, _res, next) => {
      console.log(`[DEV] ${req.method} ${req.originalUrl}`);
      next();
    });
  }

  // CORS
  const devOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
  ];

  const prodOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL;

  app.use(cors({
    origin: isProd
      // in prod: only allow the one frontend URL
      ? prodOrigin
      // in dev: allow localhost variants + tools (undefined origin)
      : (origin, callback) => {
          if (!origin || devOrigins.includes(origin)) {
            return callback(null, true);
          }
          console.warn("[CORS] Blocked origin:", origin);
          callback(new Error("Not allowed by CORS"));
        },
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    exposedHeaders: ["Content-Disposition"],
  }));

  //─── ROUTES ───────────────────────────────────────────────────────────────────
  app.get("/",      (_req, res) => res.json({ message: "Hello, this is the server!" }));
  app.get("/api",   (_req, res) => res.json({ message: "Hello, this is the API!" }));

  app.use("/api/auth",        authRoutes);
  app.use("/api/users",       userRoutes);
  app.use("/api/restaurants", restaurantRoutes);
  app.use("/api/dishes",      dishRoutes);

  //─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
  app.use((err, _req, res, _next) => {
    if (err.message === "Not allowed by CORS") {
      return res.status(403).json({ error: err.message });
    }
    console.error("[ERROR]", err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });

  //─── MONGOOSE CONNECTION ──────────────────────────────────────────────────────
  if (!process.env.MONGO_URI) {
    console.error("❌  MONGO_URI is not set in environment");
    process.exit(1);
  }

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅  MongoDB Connected");
      app.listen(PORT, () => {
        console.log(`🚀  Server running on port ${PORT} (${isProd ? "production" : "development"})`);
      });
    })
    .catch((err) => {
      console.error("❌  MongoDB Connection Error:", err);
      process.exit(1);
    });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️  Mongoose disconnected");
  });
