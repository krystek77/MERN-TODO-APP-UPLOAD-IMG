import type from "./types";
import { returnErrors, clearErrors } from "./errorActions";

export const configToken = (getState) => {
  //get token from local storage
  const token = getState().user.token;
  const headers = {
    "Content-Type": "application/json",
  };
  //
  if (token) {
    headers["x-auth-token"] = token;
  }
  //
  return headers;
};

//check token and load data user
export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: type.USER_LOADING });
    let resStatus = 0;
    fetch("/users/signin/user", {
      method: "GET",
      headers: configToken(getState),
    })
      .then((response) => {
        resStatus = response.status;
        return response.json();
      })
      .then((response) => {
        switch (resStatus) {
          case 401:
            dispatch(
              returnErrors(response.message, response.status, "Unauthtorized")
            );
            break;
          case 200:
            dispatch({ type: type.USER_LOADED, user: response });
            break;
          default:
            console.log("Unhandled");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: type.AUTH_ERROR });
      });
  };
};
//Sign up user
export const signUp = (newUser) => {
  return (dispatch, getState) => {
    console.log("signUp action");
    let resStatus = 0;
    fetch("/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        resStatus = response.status;
        return response.json();
      })
      .then((response) => {
        switch (resStatus) {
          case 409:
            // console.log(resStatus, response);
            dispatch(
              returnErrors(response.message, response.status, response.id)
            );
            dispatch({ type: type.SIGNUP_FAIL });
            break;
          case 201:
            // console.log(resStatus, response);
            dispatch({
              type: type.SIGNUP_SUCCESS,
              token: response.token,
              user: response.user,
            });
            dispatch(clearErrors());
            break;
          case 400:
            // console.log(resStatus, response);
            dispatch(
              returnErrors(response.message, response.status, response.id)
            );
            dispatch({ type: type.SIGNUP_FAIL });
            break;
          case 500:
            // console.log(resStatus, response);
            dispatch(
              returnErrors(response.message, response.status, response.id)
            );
            dispatch({ type: type.SIGNUP_FAIL });
            break;
          default:
            console.log("uhandled");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: type.SIGNUP_FAIL });
      });
  };
};
//Logout user
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: type.LOGOUT_SUCCES });
  };
};
//Sign in user
export const signin = (user) => {
  return (dispatch, getState) => {
    let resStatus = 0;
    fetch("/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((result) => {
        resStatus = result.status;
        return result.json();
      })
      .then((data) => {
        switch (resStatus) {
          case 409:
            // console.log('DATA', resStatus, data);
            dispatch(returnErrors(data.message, data.status, data.id));
            dispatch({ type: type.LOGIN_FAIL });
            break;
          case 403:
            // console.log('DATA', resStatus, data);
            dispatch(returnErrors(data.message, data.status, data.id));
            dispatch({ type: type.LOGIN_FAIL });
            break;
          case 400:
            // console.log('DATA', resStatus, data);
            dispatch(returnErrors(data.message, data.status, data.id));
            dispatch({ type: type.LOGIN_FAIL });
            break;
          case 201:
            // console.log('DATA', resStatus, data);
            dispatch({
              type: type.LOGIN_SUCCESS,
              token: data.token,
              user: data.user,
            });
            dispatch(clearErrors());
            break;
          default:
            console.log("not handled");
            break;
        }
      })
      .catch((error) => {
        console.log(type.LOGIN_FAIL, error);
        dispatch({ type: type.LOGIN_FAIL });
      });
  };
};
