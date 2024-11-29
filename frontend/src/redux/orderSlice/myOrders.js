import { createSlice } from "@reduxjs/toolkit";

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    MY_ORDER_REQUEST: (state) => {
      state.loading = true;
      state.error = null; // Reset error if any
    },
    MY_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    MY_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
  },
});

export const {
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  CLEAR_ERROR,
} = myOrdersSlice.actions;

export default myOrdersSlice.reducer;
