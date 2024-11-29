import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isUpdated: false,
  error: null,
};

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    UPDATE_PRODUCT_REQUEST(state) {
      state.loading = true;
    },
    UPDATE_PRODUCT_SUCCESS(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_PRODUCT_RESET(state) {
      state.isUpdated = false;
    },
    UPDATE_PRODUCT_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS(state) {
      state.error = null;
    },
  },
});

export const {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} = updateProductSlice.actions;

export default updateProductSlice.reducer;
