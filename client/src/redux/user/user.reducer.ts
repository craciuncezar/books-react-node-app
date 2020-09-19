import { UserAction } from "./user.actions";

export interface User {
  token: string;
  name: string;
}

const initialState: User = {
  token: window.localStorage.getItem("jwt-token") || "",
  name: window.localStorage.getItem("name") || "",
};

export function userReducer(state = initialState, action: UserAction): User {
  switch (action.type) {
    case "/user/USER_LOGGED_IN":
      return action.payload;
    case "/user/LOGGED_OUT":
      return initialState;
    default:
      return state;
  }
}
