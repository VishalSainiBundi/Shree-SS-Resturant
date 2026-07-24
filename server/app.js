
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connect_DB = require("./connectDB");

const dishRouter = require("./Routes/dishRoute");
const userRouter = require("./Routes/userRoute");
const menuRoute = require("./Routes/menuRoute");
const OrderRoute = require("./Routes/orderRoute");
const reserveRoute = require("./Routes/reserveRoute");
const bookReserveRoute = require("./Routes/bookReserveRoute");

const app = express();

app.use(express.json());

// CORS: Allow both local dev and production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", 
  "https://shree-ss-resturant.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("⚠️ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use("/dish", dishRouter);
app.use("/user", userRouter);
app.use("/menu", menuRoute);
app.use("/order", OrderRoute);
app.use("/add_table", reserveRoute);
app.use("/reserve", bookReserveRoute);

// Global error handler - must come after all routes
app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

connect_DB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });