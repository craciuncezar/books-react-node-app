import axios from "axios";
import { SERVER } from "../../config/constants";

export const logInUser = (email, password) => async dispatch => {
  axios
    .post(SERVER + "/users/login", {
      email,
      password
    })
    .then(({ data }) => {
      dispatch({
        type: UserActionType.logIn,
        data
      });
      window.localStorage.setItem("jwt-token", data.token);
    });
};

export const logOutUser = () => {
  window.localStorage.removeItem("jwt-token");
  return {
    type: UserActionType.logOut
  };
};

export const registerUser = (email, password, name) => async dispatch => {
  axios
    .post(SERVER + "/users/register", { email, password, name })
    .then(({ data }) => {
      dispatch({
        type: UserActionType.register,
        data: { name, ...data }
      });
      window.localStorage.setItem("jwt-token", data.token);
    });
};

export const setTokenFromStorage = token => {
  return {
    type: UserActionType.setToken,
    data: token
  };
};

export const UserActionType = {
  logIn: "/user/LOG_IN",
  logOut: "/user/LOG_OUT",
  register: "/user/REGITER",
  setToken: "/user/SET_TOKEN"
};
