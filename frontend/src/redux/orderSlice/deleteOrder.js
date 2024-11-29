import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  isDeleted: false,
  error: null,
};

const deleteOrderSlice = createSlice({
  name: "deleteOrder",
  initialState,
  reducers: {
    DELETE_ORDER_REQUEST: (state) => {
      state.loading = true;
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_ORDER_RESET: (state) => {
      state.isDeleted = false;
    },
    DELETE_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
  },
});

export const {
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  CLEAR_ERROR,
} = deleteOrderSlice.actions;

export default deleteOrderSlice.reducer;
