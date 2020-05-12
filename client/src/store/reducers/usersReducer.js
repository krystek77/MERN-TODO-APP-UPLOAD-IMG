import type from "../actions/types";
//
const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  isAuthenticated: false,
  user: null,
};
//
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.USER_LOADING:
      //fetched data login user

      return {
        ...state,
        isLoading: true,
      };
    case type.USER_LOADED:
      //fetching data login user

      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.user,
      };
    case type.LOGIN_SUCCESS:
      localStorage.setItem("token", action.token);

      return {
        ...state,
        token: action.token,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case type.LOGIN_FAIL:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case type.SIGNUP_SUCCESS:
      localStorage.setItem("token", action.token);

      return {
        ...state,
        token: action.token,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case type.SIGNUP_FAIL:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case type.LOGOUT_SUCCES:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case type.AUTH_ERROR:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default usersReducer;
