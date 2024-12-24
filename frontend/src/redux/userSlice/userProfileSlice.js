import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
  message: '',
  currentUser: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    UPDATE_PROFILE_REQUEST: (state) => {
      state.loading = true;
    },
    UPDATE_PASSWORD_REQUEST: (state) => {
      state.loading = true;
    },
    UPDATE_USER_REQUEST: (state) => {
      state.loading = true;
    },
    USER_DELETE_REQUEST: (state) => {
      state.loading = true;
    },

    UPDATE_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.currentUser = action.payload;
    },    
    UPDATE_PASSWORD_SUCCESS: (state) => {
      state.loading = false;
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    USER_DELETE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },

    UPDATE_PROFILE_RESET: (state) => {
      state.isUpdated = false;
    },
    UPDATE_PASSWORD_RESET: (state) => {
      state.isUpdated = false;
    },
    UPDATE_USER_RESET: (state) => {
      state.isUpdated = false;
    },
    USER_DELETE_RESET: (state) => {
      state.isDeleted = false;
    },

    UPDATE_PROFILE_FAIL: (state, action) => {    
      console.log("action.payload",action.payload);
        
      state.loading = false;
      state.error = action.payload;
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UPDATE_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    USER_DELETE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_USER_REQUEST,
  USER_DELETE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_DELETE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_RESET,
  UPDATE_USER_RESET,
  USER_DELETE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_USER_FAIL,
  USER_DELETE_FAIL,
  CLEAR_ERRORS,
} = profileSlice.actions;

export default profileSlice.reducer;
