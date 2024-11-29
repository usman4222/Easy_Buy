export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST" 
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS" 
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL"

export const MY_ORDER_REQUEST = "MY_ORDER_REQUEST" 
export const MY_ORDER_SUCCESS = "MY_ORDER_SUCCESS" 
export const MY_ORDER_FAIL = "MY_ORDER_FAIL"

export const ALL_ORDER_REQUEST = "ALL_ORDER_REQUEST" 
export const ALL_ORDER_SUCCESS = "ALL_ORDER_SUCCESS" 
export const ALL_ORDER_FAIL = "ALL_ORDER_FAIL"

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST" 
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS" 
export const UPDATE_ORDER_RESET = "UPDATE_ORDER_RESET" 
export const UPDATE_ORDER_FAIL = "UPDATE_ORDER_FAIL"

export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST" 
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS" 
export const DELETE_ORDER_RESET = "DELETE_ORDER_RESET" 
export const DELETE_ORDER_FAIL = "DELETE_ORDER_FAIL"

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST" 
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS" 
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL"


export const CLEAR_ERROR = "CLEAR_ERROR"

// import React, { Fragment, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Typography } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";
// import { clearErrors, createOrder } from "../../actions/orderAction";
// import CheckOutProcessPage from "../../pages/CheckOutProcessPage";
// import { loadStripe } from "@stripe/stripe-js";

// const Payment = () => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);

//   const itemsPrice = orderInfo?.subTotal || 0;
//   const taxPrice = orderInfo?.tax || 0;
//   const shippingPrice = orderInfo?.shippingCharges || 0;
//   const totalPrice = orderInfo?.totalPrice || 0;
//   const shippingPhone = shippingInfo.phone;
//   const totalPriceOfProduct = orderInfo ? orderInfo.totalPrice || 0 : 0;
//   const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
//   console.log(shippingPhone);

//   const productName = cartItems.map((item) => item.name);

//   const paymentHandler = async () => {
//     try {

//       const stripe = await loadStripe(
//         "pk_test_51NyXMoIuM3EPOKzANSC73Y3aFvaDXXniKP3XBrRDECz3tyM4t2WaKhfWuAqWsvuY6crcog6Q6TL3cKXFbd0GAxnF005dok0kxI"
//       );

//       const updatedCartItems = cartItems.map((item) => ({
//         ...item,
//         name: item.name, // Add name from cartItems
//         price: item.price, // Add price from cartItems
//       }));

//       const order = {
//         shippingInfo: {
//           ...shippingInfo, // spread existing shipping info
//           phoneNo: shippingPhone, // Make sure 'phoneNo' is included
//         },
//         orderItems: updatedCartItems,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//       };

//       localStorage.setItem("order", JSON.stringify(order));

//       console.log("Order before dispatch:", order);

//       // Dispatch the createOrder action (this should save the order into the database)
//       dispatch(createOrder(order));

//       const response = await fetch(
//         "http://localhost:4000/api/payment/create-checkout-sessions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             orders: [
//               {
//                 shippingInfo,
//                 productName: productName,
//                 itemsPrice,
//                 taxPrice,
//                 shippingPrice,
//                 totalPriceOfProduct,
//                 totalQuantity,
//               },
//             ],
//           }),
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const session = await response.json();

//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         alert(result.error.message);
//       } else {

//         const randomId = Math.random().toString(36).substr(2, 9);  // Generates a random alphanumeric ID

//         // Set paymentInfo with random ID and status as "success"
//         const paymentInfo = {
//           id: randomId,
//           status: "success",
//         };
    
//           // Add paymentInfo to the order object
//           order.paymentInfo = paymentInfo;
    
//           // Store the order object in localStorage with paymentInfo included
//           localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

//         // Dispatch the createOrder action
//         dispatch(createOrder(order));
//         navigate("/success");
//       } 
//     } catch (error) {
//       console.error("Error during paymentHandler:", error.message);
//     }
//   };

//   return (
//     <Fragment>
//       <CheckOutProcessPage activeStep={2} />
//       <div className="paymentContainer">
//         <button
//           onClick={paymentHandler}
//           className="paymentBtn"
//         >{`Pay - $${totalPrice}`}</button>
//       </div>
//     </Fragment>
//   );
// };

// export default Payment;
