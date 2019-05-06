import { combineReducers } from "redux";
import { bookListReducer } from "./bookLists/bookLists.reducer";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  bookLists: bookListReducer
});

export default rootReducer;
