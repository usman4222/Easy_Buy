import React, { useEffect, useState } from "react";
import success from "../assets/images/success.gif";
import MetaData from "../components/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction";
import {
  CLEAR_CART,
  SET_PAYMENT_STATUS,
} from "../redux/productSlice/cartSlice";

const ProcessPaymentPage = () => {
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (!sessionId) {
      setLocalError("Session ID is missing. Payment failed.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `https://easy-buy-s9rh.vercel.app/api/stripe/verify-session/${sessionId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const text = await response.text();
          const session = JSON.parse(text);

          if (session.payment_status === "paid" && !isOrderCreated) {
            // dispatch(SET_PAYMENT_STATUS("paid"));
            setSessionDetails(session);
            setPaymentVerified(true);

            const orderData = {
              shippingInfo,
              orderItems: cartItems,
              itemsPrice: session.amount_total / 100,
              taxPrice: session.amount_total * 0.1,
              shippingPrice: 5,
              totalPrice: session.amount_total / 100,
              paymentInfo: { id: session.payment_intent, status: "Paid" },
            };

            dispatch(createOrder(orderData));
            dispatch(CLEAR_CART());
            localStorage.removeItem("cartItems");
            sessionStorage.removeItem("orderInfo");
            setIsOrderCreated(true);
            navigate("/success");
            // setTimeout(() => {
            //   dispatch(SET_PAYMENT_STATUS(null));
            // }, 60000);
          } else {
            dispatch(SET_PAYMENT_STATUS("failed"));
            setLocalError("Payment failed. Please try again.");
          }
        } else {
          dispatch(SET_PAYMENT_STATUS("failed"));
          setLocalError("Failed to verify payment session.");
        }
      } catch (err) {
        setLocalError("An error occurred while verifying payment.");
      }
    };

    verifyPayment();
  }, [navigate, shippingInfo, cartItems, dispatch, isOrderCreated]);

  // If payment is still being processed
  return (
    <div>
      <MetaData title="Payment Processing" />
      <div className="flex justify-center items-center">
        <h1 className="text-center ">Processing Payment...</h1>
      </div>
    </div>
  );
};

export default ProcessPaymentPage;
