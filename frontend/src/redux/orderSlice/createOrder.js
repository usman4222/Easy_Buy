import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  shippingInfo: {},
  loading: false,
  order: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    CREATE_ORDER_REQUEST: (state) => {
      state.loading = true;
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    CREATE_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
  },
});

export const {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERROR,
} = orderSlice.actions;

export default orderSlice.reducer;
