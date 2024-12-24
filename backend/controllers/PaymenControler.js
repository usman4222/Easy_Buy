import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from "stripe";



export const createCheckOut = catchAsyncError(async (req, res, next) => {
  const { orders } = req.body;
  if (!Array.isArray(orders)) {
    return res
      .status(400)
      .json({ success: false, message: "Orders data should be an array" });
  }

  const lineItems = orders.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: Array.isArray(item.productName)
          ? item.productName.join(", ")
          : item.productName,
      },
      unit_amount: Math.round(item.totalPriceOfProduct * 100), 
    },
    quantity: item.totalQuantity || 1, 
  }));

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL.replace(
        /\/$/,
        ""
      )}/process-payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    next(error);
  }
});

export const verifyPayment = catchAsyncError(async (req, res) => {
  const { sessionId } = req.params;

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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
