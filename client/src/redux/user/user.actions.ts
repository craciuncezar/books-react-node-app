import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { SERVER } from "../../config/constants";
import { User } from "./user.reducer";

export type UserAction =
  | { type: "/user/USER_LOGGED_IN"; payload: User }
  | { type: "/user/LOGGED_OUT" };

const userLoggedIn = (user: User): UserAction => ({
  type: "/user/USER_LOGGED_IN",
  payload: user,
});

export const logOutUser = (): UserAction => {
  window.localStorage.removeItem("jwt-token");
  window.localStorage.removeItem("name");

  return {
    type: "/user/LOGGED_OUT",
  };
};

export const logInUser = (
  email: string,
  password: string
): ThunkAction<void, null, null, UserAction> => async (dispatch) => {
  const { data: user } = await axios.post<User>(SERVER + "/users/login", {
    email,
    password,
  });

  dispatch(userLoggedIn(user));
  window.localStorage.setItem("jwt-token", user.token);
  window.localStorage.setItem("name", user.name);
};

export const registerUser = (
  email: string,
  password: string,
  name: string
): ThunkAction<void, null, null, UserAction> => async (dispatch) => {
  const { data: user } = await axios.post(SERVER + "/users/register", {
    email,
    password,
    name,
  });

  window.localStorage.setItem("jwt-token", user.token);
  window.localStorage.setItem("jwt-token", user.name);
  dispatch(userLoggedIn(user));
};
