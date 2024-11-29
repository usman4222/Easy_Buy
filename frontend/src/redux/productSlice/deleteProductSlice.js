import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isDeleted: false,
  error: null,
};

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    DELETE_PRODUCT_REQUEST(state) {
      state.loading = true;
    },
    DELETE_PRODUCT_SUCCESS(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_PRODUCT_RESET(state) {
      state.isDeleted = false;
    },
    DELETE_PRODUCT_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS(state) {
      state.error = null;
    },
  },
});



export const {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  CLEAR_ERRORS,
} = deleteProductSlice.actions;

export default deleteProductSlice.reducer;
