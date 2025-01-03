import express from "express";
import {
  createCheckOut,
  verifyPayment,
} from "../controllers/PaymenControler.js";
const router = express.Router();

router.route("/create-checkout-sessions").post(createCheckOut);
router.route("/stripe/verify-session/:sessionId").get(verifyPayment);

export default router;
