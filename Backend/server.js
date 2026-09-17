const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // Will restrict later
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/speakers", require("./routes/speakerRoutes"));
app.use("/api/programme", require("./routes/programmeRoutes"));
app.use("/api/conference", require("./routes/conferenceRoutes"));
app.use("/api/news-interactions", require("./routes/newsInteractionRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Exponential Conference API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use(require("./middleware/errorMiddleware"));
app.use(require("./middleware/notFoundMiddleware"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
