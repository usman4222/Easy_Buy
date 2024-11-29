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
    },
    ORDER_DETAILS_SUCCESS(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    ORDER_DETAILS_FAIL(state, action) {
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
