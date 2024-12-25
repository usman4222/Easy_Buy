import axios from "axios";
import {
  CLEAR_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from "../redux/orderSlice/createOrder";
import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
} from "../redux/orderSlice/allOrder";
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../redux/orderSlice/orderDetails";
import {
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../redux/orderSlice/updateOrder";
import { MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS } from "../redux/orderSlice/myOrders";
import { DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS } from "../redux/orderSlice/deleteOrder";

let apiurl = "https://easy-buy-s9rh.vercel.app"
// let apiurl = "http://localhost:4000"


export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(CREATE_ORDER_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${apiurl}/api/order/new-order`,
      order,
      config
    );

    dispatch(CREATE_ORDER_SUCCESS(data));
  } catch (error) {
    console.error("Error creating order:", error);
    dispatch(CREATE_ORDER_FAIL(error.response?.data?.message || error.message));
  }
};



export const myOrders = () => async (dispatch) => {
  try {
    dispatch(MY_ORDER_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${apiurl}/api/order/my-orders`,
      config
    );
    
    dispatch(MY_ORDER_SUCCESS(data.orders));
  } catch (error) {
    dispatch(MY_ORDER_FAIL(error.response.data.message));
  }
};



export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(ALL_ORDER_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${apiurl}/api/order/admin/orders`,
      config
    );
    dispatch(ALL_ORDER_SUCCESS(data.orders));
  } catch (error) {
    dispatch(ALL_ORDER_FAIL( error.response.data.message));
  }
};



export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch(UPDATE_ORDER_REQUEST());
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${apiurl}/api/order/admin/update-order-status/${id}`,
      order,
      config
    );
    dispatch(UPDATE_ORDER_SUCCESS(data.success));
  } catch (error) {
    dispatch(UPDATE_ORDER_FAIL(error.response.data.message));
  }
};



export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(DELETE_ORDER_REQUEST());
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${apiurl}/api/order/admin/delete-order/${id}`,
      config
    );
    dispatch(DELETE_ORDER_SUCCESS(data.success));
  } catch (error) {
    dispatch(DELETE_ORDER_FAIL(error.response.data.message));
  }
};



export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(ORDER_DETAILS_REQUEST());

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${apiurl}/api/order/order-detail/${id}`,
      config
    );

    dispatch(ORDER_DETAILS_SUCCESS(data.order)); 
  } catch (error) {
    console.error("Error fetching order details:", error); 
    dispatch(ORDER_DETAILS_FAIL(error.response?.data?.message || "Server Error"));
  }
};



export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERROR());
};
