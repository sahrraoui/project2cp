// app.js
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const cors = require("cors");
const corsConfig = require("./config/cors");
const { connectDB } = require("./Database/db");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const multer = require("multer");

// Middleware
const notFoundMiddleware = require("./middleware/not-found");
const { errorHandler } = require("./middleware/errorHandler");

// Routes
const authRoutes = require("./routes/auth");
const googleAuthRoutes = require("./routes/googleAuth");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/payment");
const hotelsRouter = require("./routes/hotels");
const homesRouter = require("./routes/homes");
const carsRouter = require("./routes/cars");
const generalRouter = require("./routes/general");
const bookingRouter = require("./routes/booking");
const notificationRouter = require("./routes/notifications");

const app = express();

// Multer storage config for file uploads (if you use it)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Print env vars for debugging (remove in production)
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("API_BASE_URL:", process.env.API_BASE_URL);

// Security middlewares
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
app.use(cors(corsConfig));

// Performance
app.use(compression());

// Parse JSON bodies (limit to 10kb)
app.use(express.json({ limit: "10kb" }));

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set trust proxy if behind a reverse proxy (for secure cookies)
app.set("trust proxy", 1);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret", // REQUIRED!
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // set true if HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "strict",
    },
  })
);

// Rate limiter middleware (general API rate limiting)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// Initialize passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Import passport strategies
require("./config/passport");

// Routes
app.use("/api/auth", authRoutes);
app.use("/auth/google", googleAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

app.use("/api/v1/homes", homesRouter);
app.use("/api/v1", generalRouter);
app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/hotels", hotelsRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/notifications", notificationRouter);

// 404 Not Found middleware
app.use(notFoundMiddleware);

// Global error handler
app.use(errorHandler);

// Connect to database and start server
const connect = async () => {
  try {
    console.log("Attempting MongoDB connection...");
    await connectDB();
    console.log("Connected to MongoDB Atlas");

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Stripe webhook endpoint: http://localhost:${PORT}/api/payment/webhook`
      );
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connect();

module.exports = app; // Optional, if you want to export for testing
