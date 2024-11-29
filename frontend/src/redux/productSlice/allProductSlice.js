import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
};


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        ALL_PRODUCT_REQUEST: (state) => {
            state.loading = true;
            state.products = [];
        },
        ALL_PRODUCT_SUCCESS: (state, action) => {
            console.log("Payload:", action.payload);
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.totalProductsCount; 
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        },
        ADMIN_PRODUCT_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        ALL_PRODUCT_FAIL: (state, action) => {
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
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,
} = productSlice.actions;

export default productSlice.reducer;