import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import FooterComponent from "./components/FooterComponent";
import NewsLetter from "./components/NewsLetter";
import OffersComponent from "./components/OffersComponent";
import Test from "./Test";

// Lazy loading for pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckOutProcessPage = lazy(() => import("./pages/CheckOutProcessPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AddProduct = lazy(() => import("./pages/Admin/ProductPages/AddProduct"));
const AllProducts = lazy(() => import("./pages/Admin/ProductPages/AllProducts"));
const UpdateProduct = lazy(() => import("./pages/Admin/ProductPages/UpdateProduct"));
const ShippingDetails = lazy(() => import("./components/CheckOutProcess/ShippingDetails"));
const ConfirmOrder = lazy(() => import("./components/CheckOutProcess/ConfirmOrder"));
const Payment = lazy(() => import("./components/CheckOutProcess/Payment"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const UserProfile = lazy(() => import("./components/User/UserProfile"));
const AllUser = lazy(() => import("./pages/Admin/UsersPages/AllUser"));
const GetReviews = lazy(() => import("./pages/Admin/Reviews/GetReviews"));
const AdminProtectedRoute = lazy(() => import("./components/AdminProtectedRoute"));
const AllOrders = lazy(() => import("./pages/Admin/OrdersPage.jsx/AllOrders"));
const OrderInfo = lazy(() => import("./components/AdminTables/OrderInfo"));
const UserOrdersTable = lazy(() => import("./components/User/UserOrdersTable"));
const UserOrderInfo = lazy(() => import("./components/User/UserOrderInfo"));
const ProcessPaymentPage = lazy(() => import("./pages/ProcessPaymentPage"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard/index"));
const UpdateUser = lazy(() => import("./components/User/UpdateUser"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

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
    "/order-info",
  ];

  const shouldHideLayout = hideLayout.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout-process" element={<CheckOutProcessPage />} />
            <Route path="/shipping" element={<ShippingDetails />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/process/payment" element={<Payment />} />

            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/my-orders" element={<UserOrdersTable />} />
            <Route path="/edit-profile" element={<UpdateUser />} />
            <Route path="/my-order-info/:id" element={<UserOrderInfo />} />
            {/* <Route path="/test" element={<Test />} /> */}
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
      </Suspense>

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
