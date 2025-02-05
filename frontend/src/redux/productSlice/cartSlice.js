import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    shippingInfo: {},
    // paymentStatus: null, 
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            const newItem = action.payload;

            const index = state.cartItems.findIndex(
                (item) => item.productId === newItem.productId
            );

            if (index !== -1) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        REMOVE_CART_ITEM: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.productId !== action.payload
            );
        },
        SAVE_SHIPPING_INFO: (state, action) => {
            state.shippingInfo = action.payload;
        },
        CLEAR_CART: (state) => {
            state.cartItems = [];
            state.paymentStatus = null;
        },
        // SET_PAYMENT_STATUS: (state, action) => {
        //     state.paymentStatus = action.payload;  
        //   },
    },
});

export const { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO, CLEAR_CART,SET_PAYMENT_STATUS  } =
    cartSlice.actions;

export default cartSlice.reducer;
