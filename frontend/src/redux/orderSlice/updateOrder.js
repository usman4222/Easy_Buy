import { createSlice } from '@reduxjs/toolkit';

const orderUpdateSlice = createSlice({
    name: 'orderUpdate',
    initialState: {
        orders: [],
        loading: false,
        isUpdated: false,
        error: null
    },
    reducers: {
        UPDATE_ORDER_REQUEST: (state) => {
            state.loading = true;
        },
        UPDATE_ORDER_SUCCESS: (state, action) => {
            state.loading = false;
            state.isUpdated = true;
            const updatedOrderIndex = state.orders.findIndex(order => order._id === action.payload._id);
            if (updatedOrderIndex >= 0) {
                state.orders[updatedOrderIndex] = action.payload;
            }
        },
        UPDATE_ORDER_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        UPDATE_ORDER_RESET: (state) => {
            state.isUpdated = false;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        }
    }
});

export const {
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    CLEAR_ERROR
} = orderUpdateSlice.actions;

export default orderUpdateSlice.reducer;
