import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    success: false,
    error: null,
};

const newReviewSlice = createSlice({
    name: 'newReview',
    initialState,
    reducers: {
        NEW_REVIEW_REQUEST: (state) => {
            state.loading = true;
        },
        NEW_REVIEW_SUCCESS: (state, action) => {
            state.loading = false;
            state.success = action.payload;
        },
        NEW_REVIEW_RESET: (state) => {
            state.success = false;
        },
        NEW_REVIEW_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        },
    },
});

export const {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
} = newReviewSlice.actions;

export default newReviewSlice.reducer;
