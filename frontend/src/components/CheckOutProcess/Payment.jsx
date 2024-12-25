import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutProcessPage from "../../pages/CheckOutProcessPage";
import { loadStripe } from "@stripe/stripe-js";
import pay from "../../assets/images/pay.gif";
import MetaData from "../MetaData";
import { isCartReadyForCheckout } from "../../utils/cartUtil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
  const itemsPrice = orderInfo?.subTotal || 0;
  const taxPrice = orderInfo?.tax || 0;
  const shippingPrice = orderInfo?.shippingCharges || 0;
  const totalPrice = orderInfo?.totalPrice || 0;
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const productName = cartItems.map((item) => item.name);

  useEffect(() => {
    if (isCartReadyForCheckout(cartItems)) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const createCheckoutSession = async (orders) => {
    try {
      const response = await fetch(
        "https://easy-buy-s9rh.vercel.app/api/payment/create-checkout-sessions",
        // "http://localhost:4000/api/payment/create-checkout-sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orders),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to create session. Status: ${
            response.status
          }. Error: ${JSON.stringify(errorData)}`
        );
      }

      const session = await response.json();
      return session.id;
    } catch (error) {
      console.error("Error during createCheckoutSession:", error);
      throw error;
    }
  };

  const paymentHandler = async () => {
    try {
      if (!STRIPE_KEY) {
        toast.error('Payment gateway is not available for Test Mode.');
        return;
      }
      const stripe = await loadStripe(STRIPE_KEY);

      const session = await createCheckoutSession({
        orders: [
          {
            shippingInfo,
            productName,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPriceOfProduct: totalPrice,
            totalQuantity,
          },
        ],
      });

      if (!session) {
        throw new Error("Session ID is missing.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session,
      });

      if (result.error) {
        throw new Error(`Stripe Checkout Error: ${result.error.message}`);
      }

      navigate("/process-payment");
    } catch (error) {
      console.error("Error during paymentHandler:", error);
      toast.error("Payment failed. Payment gateway is not available for Test Mode.");
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <ToastContainer />
      <CheckOutProcessPage activeStep={2} />
      <div className="paymentContainer">
        <div>
          <img src={pay} alt="pay" className="w-80 mb-20" />
        </div>
        <button
          onClick={paymentHandler}
          className="bg-[#FE4C50] px-20 py-2 hover:bg-[#FE4C50]/90 text-white"
        >
          {`Pay - $${totalPrice}`}
        </button>
      </div>
    </Fragment>
  );
};

export default Payment;
