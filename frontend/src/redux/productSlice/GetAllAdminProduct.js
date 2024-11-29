import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
};


const adminProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        ADMIN_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            state.products = [];
        },
        ADMIN_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        ADMIN_PRODUCT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = "Error in getting products";
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        },
    },
});


export const {
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    CLEAR_ERRORS,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;