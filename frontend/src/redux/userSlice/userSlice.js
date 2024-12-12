import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        LOGIN_REQUEST: (state) => {
            state.loading = true;
            state.error = null
        },
        LOGIN_SUCCESS: (state, action) => {
            console.log("this is user slice", action.payload);
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        LOGIN_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload.message || "Something went wrong!"; 
        },
        LOGOUT_SUCCESS: (state) => {
            state.currentUser = null,
                state.loading = false,
                state.error = null
        },
        LOGOUT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
          },
    }
})

export const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} = userSlice.actions

export default userSlice.reducer