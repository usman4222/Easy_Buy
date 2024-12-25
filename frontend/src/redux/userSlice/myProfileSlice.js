import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  loading: false,
  isAuthenticated: false,
  error: null,
};

const myProfileSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    LOAD_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LOAD_SUCCESS: (state, action) => { 
      state.loading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    LOAD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const { LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, CLEAR_ERRORS } =
  myProfileSlice.actions;

export default myProfileSlice.reducer;
