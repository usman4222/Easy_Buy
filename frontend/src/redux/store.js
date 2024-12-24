import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import userReducer from "./userSlice/userSlice";
import productReducer from "./productSlice/productSlice";
import productSlice from "./productSlice/allProductSlice";
import productDetailsSlice from "./productSlice/productDetails";
import cartReducer from "./productSlice/cartSlice";
import updateProductSlice from "./productSlice/updateProduct";
import newReviewSlice from "./reviewSlice/addReview";
import productReviewsSlice from "./reviewSlice/allReviews";
import orderSlice from "./orderSlice/createOrder";
import allOrdersSlice from "./orderSlice/allOrder";
import deleteOrderSlice from "./orderSlice/deleteOrder";
import orderDetailsSlice from "./orderSlice/orderDetails";
import orderUpdateSlice from "./orderSlice/updateOrder";
import myOrdersSlice from "./orderSlice/myOrders";
import allUsersSlice from "./userSlice/allUsersSlice";
import myProfileSlice from "./userSlice/myProfileSlice";
import profileSlice from "./userSlice/userProfileSlice";
import adminProductSlice from "./productSlice/GetAllAdminProduct";
import deleteProductSlice from "./productSlice/deleteProductSlice";

const rootReducer = combineReducers({
  user: userReducer,
  allUsers: allUsersSlice,
  userProfile: profileSlice,
  myProfileInfo: myProfileSlice,
  newProduct: productReducer,
  allProducts: productSlice,
  deleteProduct: deleteProductSlice,
  allAdminProducts: adminProductSlice,
  productDetails: productDetailsSlice,
  updateProduct: updateProductSlice,
  newReview: newReviewSlice,
  allReviews: productReviewsSlice,
  orderDetails: orderSlice,
  allOrders: allOrdersSlice,
  delOrder: deleteOrderSlice,
  singleOrderDetails: orderDetailsSlice,
  myOrders: myOrdersSlice,
  orderUpdate: orderUpdateSlice,
  cart: cartReducer,
});

//to persist state in storage
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //middleware to prevent default error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persister = persistStore(store);
