import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {
    ORDER_DETAILS_REQUEST(state) {
      state.loading = true;
      console.log("ORDER_DETAILS_REQUEST triggered"); // Log to track when request starts
    },
    ORDER_DETAILS_SUCCESS(state, action) {
      console.log("ORDER_DETAILS_SUCCESS triggered with payload:", action.payload); // Log action payload
      state.loading = false;
      state.order = action.payload;
    },
    ORDER_DETAILS_FAIL(state, action) {
      console.log("ORDER_DETAILS_FAIL triggered with error:", action.payload); // Log error message
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
});

export const {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERROR,
} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
