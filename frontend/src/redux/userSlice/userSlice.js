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

        // updateStart: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // updateSuccess: (state, action) => {
        //     state.currentUser = {
        //         ...state.currentUser,
        //         user: action.payload
        //     };
        //     state.loading = false;
        //     state.error = null;
        // },
        // updateFailure: (state, action) => {
        //     state.loading = false,
        //         state.error = action.payload
        // },
        // deleteUserStart: (state) => {
        //     state.loading = true;
        //     state.error = null;
        // },
        // deleteUserSuccess: (state, action) => {
        //     state.currentUser = null,
        //         state.loading = false,
        //         state.error = null
        // },
        // deleteUserFailure: (state, action) => {
        //     state.loading = false,
        //         state.error = action.payload
        // },,
        LOGOUT_SUCCESS: (state) => {
            state.currentUser = null,
                state.loading = false,
                state.error = null
        },
        LOGOUT_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
    // updateStart,
    // updateSuccess,
    // updateFailure,
    // deleteUserStart,
    // deleteUserSuccess,
    // deleteUserFailure,
    // signOutSuccess
} = userSlice.actions

export default userSlice.reducer