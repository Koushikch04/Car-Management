import { jwtDecode } from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  authError: null,
  authSuccess: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_SIGNUP":
    case "USER_LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: jwtDecode(action.payload.token),
        authError: null,
        authSuccess: "Authentication successful",
      };
    case "USER_LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        authError: null,
        authSuccess: null,
      };
    case "USER_AUTH_ERROR":
      return {
        ...state,
        authError: action.payload,
        authSuccess: null,
      };
    case "CLEAR_MESSAGES":
      return {
        ...state,
        authError: null,
        authSuccess: null,
      };
    default:
      return state;
  }
}
