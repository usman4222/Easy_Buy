import {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/UserConstant";
import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../redux/userSlice/userSlice";
import {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
} from "../redux/userSlice/userProfileSlice";
import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
} from "../redux/userSlice/allUsersSlice";
// import { persistor } from '../redux/store';

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(LOGIN_REQUEST());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/user/login",
      userData,
      config
    );

    console.log("data", data);

    dispatch(LOGIN_SUCCESS(data.user));
  } catch (error) {
    let errorMessage = "Something went wrong!";

    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    } else {
      errorMessage = error.message || errorMessage;
    }

    console.log("Login error:", errorMessage);
    dispatch(LOGIN_FAIL({ message: errorMessage }));
  }
};

// export const register = (userData) => async (dispatch) => {

//     try {
//         dispatch({ type: REGISTER_REQUEST })

//         const config = { headers: { "Content-Type": "multipart/form-data" } }
//         const { data } = await axios.post(
//             `/api/v1/register`,
//             upload.single('avatar'),
//             userData,
//             config
//         )
//         dispatch({
//             type: REGISTER_SUCCESS,
//             payload: data.user
//         })
//     } catch (error) {
//         dispatch({
//             type: REGISTER_FAIL,
//             payload: error.data
//         })
//         console.log("This is error data", error);
//     }
// }

export const register = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/user/register`,
      userData,
      config
    );
  } catch (error) {
    dispatch({
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : "Registration failed",
    });
    console.log("This is error data", error);
  }
};

export const load = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/me`);
    dispatch({
      type: LOAD_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.post("http://localhost:4000/api/user/logout", config);

    console.log("Dispatching LOGOUT_SUCCESS...");
    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    console.error("Error dispatching logout action:", error);

    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

export const updateProfile = (userData, userId) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/user/me/update/${userId}`,
      userData,
      config
    ); 

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    console.log("User details updated successfully", data);
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response,
    });
    console.log("This is error while updating user", error);
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    if (data && data.success) {
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: data.message || "Failed to update password.",
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.message,
    });
  }
};

export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `http://localhost:4000/api/user/admin/users`,
      config
    );

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response.data.message,
      message: "Error while getting details",
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `http://localhost:4000/api/user/admin/user/${id}/role`,
      userData,
      config
    );
    console.log(userData);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
      message: "Error while getting update",
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

    const { data } = await axios.delete(`http://localhost:4000/api/user/admin/user/${id}`, config);
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
