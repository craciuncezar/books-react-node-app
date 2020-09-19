import { combineReducers } from "redux";
import { BookList, bookListReducer } from "./bookLists/bookLists.reducer";
import { User, userReducer } from "./user/user.reducer";

export type ReduxStore = {
  user: User;
  bookLists: BookList[];
};

const rootReducer = combineReducers<ReduxStore>({
  user: userReducer,
  bookLists: bookListReducer,
});

export default rootReducer;
