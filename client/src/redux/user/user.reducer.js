import { UserActionType } from "./user.actions";

const initialState = { token: "", name: "" };

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionType.logIn:
      return action.data;
    case UserActionType.register:
      return action.data;
    case UserActionType.logOut:
      return initialState;
    case UserActionType.setToken:
      return { ...state, token: action.data };
    default:
      return state;
  }
}
