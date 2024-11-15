import axios from "axios";
import API_URL from "../api/api";

// LOGIN ACTION
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      dispatch({
        type: "USER_LOGIN",
        payload: response.data,
      });
      console.log("dispatched");
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGES" });
      }, 2000);
    } catch (error) {
      dispatch({
        type: "USER_AUTH_ERROR",
        payload: error.response.data.message || "Login failed",
      });
    }
  };

// SIGNUP ACTION
export const signup =
  ({ username, email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, {
        username,
        email,
        password,
      });
      dispatch({
        type: "USER_SIGNUP",
        payload: response.data,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGES" });
      }, 2000);
    } catch (error) {
      dispatch({
        type: "USER_AUTH_ERROR",
        payload: error.response.data.message || "Signup failed",
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");

  dispatch({
    type: "USER_LOGOUT",
  });

  console.log("User logged out successfully");
};
