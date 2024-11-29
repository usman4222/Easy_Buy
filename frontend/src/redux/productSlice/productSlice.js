import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    product: null,
    error: null
};

const newProductSlice = createSlice({
    name: "newProduct",
    initialState,
    reducers: {
        NEW_PRODUCT_REQUEST: (state) => {
            state.loading = true;
        },
        NEW_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.product = action.payload.product;
        },
        NEW_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        NEW_PRODUCT_RESET: (state) => {
            state.success = false;
            state.product = null;
            state.error = null;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        }
    }
});

export const {
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    CLEAR_ERRORS
} = newProductSlice.actions;

export default newProductSlice.reducer;
