// App.js
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Navbar from "./components/Header/Navbar";
import LandingPage from "./pages/LandingPage";
import ProductCategory from "./pages/ProductCategory";
import FooterComponent from "./components/FooterComponent";
import NewsLetter from "./components/NewsLetter";
import OffersComponent from "./components/OffersComponent";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckOutProcessPage from "./pages/CheckOutProcessPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/Admin/Dashboard/ProductPages/AddProduct";
import AllProducts from "./pages/Admin/Dashboard/ProductPages/AllProducts";
import UpdateProduct from "./pages/Admin/Dashboard/ProductPages/UpdateProduct";
import ShippingDetails from "./components/CheckOutProcess/ShippingDetails";
import ConfirmOrder from "./components/CheckOutProcess/ConfirmOrder";
import Payment from "./components/CheckOutProcess/Payment";
import SuccessPage from "./pages/SuccessPage";
import UserProfile from "./components/User/UserProfile";
import AllUser from "./pages/Admin/Dashboard/UsersPages/AllUser";
import GetReviews from "./pages/Admin/Dashboard/Reviews/GetReviews";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AllOrders from "./pages/Admin/Dashboard/OrdersPage.jsx/AllOrders";
import OrderInfo from "./components/AdminTables/OrderInfo";
import UserOrdersTable from "./components/User/UserOrdersTable";
import UserOrderInfo from "./components/User/UserOrderInfo";
import ProcessPaymentPage from "./pages/ProcessPaymentPage";

const App = () => {
  const location = useLocation();
  const hideLayout = [
    "/login",
    "/register",
    "/dashboard",
    "/add-product",
    "/all-products",
    "/update-product",
    "/all-user",
    "/product-reviews",
    "/orders",
    "/order-info"
  ];

  const shouldHideLayout = hideLayout.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout-process" element={<CheckOutProcessPage />} />
          <Route path="/shipping" element={<ShippingDetails />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/process/payment" element={<Payment />} />
        
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/my-orders" element={<UserOrdersTable />} />
          <Route path="/my-order-info/:id" element={<UserOrderInfo />} />
        </Route>

        <Route path="/success" element={<SuccessPage />} />
        <Route path="/process-payment" element={<ProcessPaymentPage />} />

        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/all-user" element={<AllUser />} />
          <Route path="/product-reviews" element={<GetReviews />} />
          <Route path="/orders" element={<AllOrders />} />
          <Route path="/order-info/:id" element={<OrderInfo />} />
        </Route>


        <Route path="/" element={<LandingPage />} />
        <Route path="/product-category" element={<ProductCategory />} />
        <Route
          path="/product-details/:slug/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {!shouldHideLayout && (
        <>
          <OffersComponent />
          <NewsLetter />
          <FooterComponent />
        </>
      )}
    </>
  );
};

export default App;



// import React, { useEffect, useState } from "react";
// import success from "../assets/images/success.gif";
// import MetaData from "../components/MetaData";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createOrder } from "../actions/orderAction";

// const SuccessPage = () => {
//   const [paymentVerified, setPaymentVerified] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Redux selectors
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { order } = useSelector((state) => state.orderDetails);

//   useEffect(() => {
//     const sessionId = new URLSearchParams(window.location.search).get("session_id");

//     if (!sessionId) {
//       setError("Session ID is missing. Payment failed.");
//       return;
//     }

//     const verifyPayment = async () => {
//       try {
//         // Verify the payment session with backend
//         const response = await fetch(`/api/stripe/verify-session/${sessionId}`);

//         console.log("response", response);
        
//         const session = await response.json();

//         if (sessionDetails.payment_status === "paid") {
//           // Proceed to create the order in the database
//           const orderData = {
//             shippingInfo,
//             orderItems: cartItems,
//             itemsPrice: session.amount_total / 100, // Amount in dollars
//             taxPrice: session.amount_total * 0.1, // Example tax calculation
//             shippingPrice: 5, // Example shipping cost
//             totalPrice: session.amount_total / 100,
//             paymentInfo: { id: session.payment_intent, status: "Paid" },
//           };

//           const createdOrder = await dispatch(createOrder(orderData));

//           if (createdOrder.error) {
//             setError(`Order creation failed: ${createdOrder.error}`);
//             return;
//           }

//           setPaymentVerified(true);
//           localStorage.setItem("order", JSON.stringify(createdOrder));
//           // navigate("/success");
//         } else {
//           setError("Payment failed. Please try again.");
//         }
//       } catch (err) {
//         setError("An error occurred while verifying payment.");
//         console.error("Payment verification error:", err);
//       }
//     };

//     verifyPayment();
//   }, [navigate, shippingInfo, cartItems, dispatch]);

//   if (error) {
//     return (
//       <div>
//         <MetaData title="Payment Failed" />
//         <h2 className="text-center text-lg text-red-500">{error}</h2>
//       </div>
//     );
//   }

//   if (!paymentVerified) {
//     return (
//       <div>
//         <MetaData title="Payment Processing" />
//         <h2 className="text-center text-lg">Verifying payment, please wait...</h2>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <MetaData title="Payment Successful" />
//       <div className="flex justify-center items-center">
//         <img src={success} alt="Payment Success" />
//       </div>
//       <h2 className="text-center mb-20 text-lg">Payment was successful!</h2>
//     </div>
//   );
// };

// export default SuccessPage;



