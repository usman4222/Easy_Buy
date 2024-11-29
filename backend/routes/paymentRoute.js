import express from "express"
import { createCheckOut, verifyPayment } from "../controllers/PaymenControler.js";
import { isAuthenticatedUser } from "../middleware/authUser.js";
const router = express.Router()


router.route('/create-checkout-sessions').post(isAuthenticatedUser, createCheckOut)
router.route('/stripe/verify-session/:sessionId').get(isAuthenticatedUser, verifyPayment)

export default router; 