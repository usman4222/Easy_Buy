import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CheckOutProcessPage from "../../pages/CheckOutProcessPage";
import MetaData from '../MetaData'
import { isCartReadyForCheckout } from "../../utils/cartUtil";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const itemsPrice = orderInfo ? orderInfo.subTotal || 0 : 0;
  const taxPrice = orderInfo ? orderInfo.tax || 0 : 0;
  const shippingPrice = orderInfo ? orderInfo.shippingCharges || 0 : 0;
  const totalPriceOfProduct = orderInfo ? orderInfo.totalPrice || 0 : 0;
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const productName = cartItems.map((item) => item.name);
  const order = [
    {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPriceOfProduct,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  useEffect(() => {
    if (isCartReadyForCheckout(cartItems)) {
      navigate("/cart"); 
    }
  }, [cartItems, navigate]);

  const shippingCharges = subtotal > 1000 ? 8 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const payment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalQuantity,
      productName,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckOutProcessPage activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="shippingInfoAreaBox">
              <div>
                <p>Name:</p>
                <span>{currentUser?.username}</span>
              </div>
              <div>
                <p>Email:</p>
                <span>{currentUser?.email}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ${item.price} <span> = </span>
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>

            <button onClick={payment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
