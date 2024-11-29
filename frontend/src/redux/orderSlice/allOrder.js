import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    ALL_ORDER_REQUEST: (state) => {
      state.loading = true;
    },
    ALL_ORDER_SUCCESS: (state, action) => {        
      state.loading = false;
      state.orders = action.payload;
    },
    ALL_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
  },
});

export const {
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  CLEAR_ERROR,
} = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
