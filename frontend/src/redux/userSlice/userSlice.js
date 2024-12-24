import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Register Actions
    REGISTER_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    REGISTER_SUCCESS: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    REGISTER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login Actions
    LOGIN_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout Actions
    LOGOUT_SUCCESS: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    LOGOUT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Errors
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} = userSlice.actions;

export default userSlice.reducer;
