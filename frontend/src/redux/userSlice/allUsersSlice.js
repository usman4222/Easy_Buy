import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    ALL_USERS_REQUEST: (state) => {
      state.loading = true;
    },
    ALL_USERS_SUCCESS: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    ALL_USERS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CLEAR_ERRORS,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
