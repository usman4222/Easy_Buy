import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import orderRoutes from "./routes/orderRoute.js";
import Stripe from "stripe";
import { ErrorHandler } from "./middleware/error.js";
// import  errorMiddleware  from "./utils/errorHandler.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app = express();

dotenv.config();

// Middleware

const allowedOrigins = [
  "http://localhost:5173",
  "https://easy-buy-g2ec.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Request received at:", req.originalUrl);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.get("/api/stripe/verify-session/:sessionId", async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(400).json({ error: "Session not found" });
    }


    res.status(200).json(session);
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: "Failed to verify payment session" });
  }
});

app.get("/test-error", (req, res, next) => {
  next(new ErrorHandler("Test Error", 500));
});

// app.use(errorMiddleware);
app.use(globalErrorHandler);

export default app;
