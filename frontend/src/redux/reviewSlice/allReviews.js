import { createSlice } from '@reduxjs/toolkit';

const productReviewsSlice = createSlice({
    name: 'productReviews',
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {
        ALL_REVIEW_REQUEST: (state) => {
            state.loading = true;
        },
        ALL_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        ALL_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        },
    },
});

export const {
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    CLEAR_ERRORS,
} = productReviewsSlice.actions;

export default productReviewsSlice.reducer;
