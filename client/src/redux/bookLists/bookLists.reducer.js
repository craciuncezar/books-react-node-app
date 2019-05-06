import { BookListsActionTypes } from "./bookLists.actions";

const {
  ADD_BOOKLIST,
  DELETE_BOOKLIST,
  ADD_BOOK_TO_LIST,
  EDIT_BOOKLIST,
  FETCH_BOOKLISTS,
  REMOVE_BOOK_FROM_BOOKLIST
} = BookListsActionTypes;

export function bookListReducer(state = [], action) {
  switch (action.type) {
    case FETCH_BOOKLISTS:
      return action.data;
    case ADD_BOOKLIST:
      return [...state, action.data];
    case EDIT_BOOKLIST:
      return state.map(bookList =>
        bookList.id === action.data.id ? action.data : bookList
      );
    case DELETE_BOOKLIST:
      return state.filter(bookList => bookList.id !== action.data);
    case REMOVE_BOOK_FROM_BOOKLIST:
      return state.map(bookList => {
        if (bookList.id === action.data.bookListId) {
          bookList.booksAdded = bookList.booksAdded.filter(
            book => book.id !== action.data.bookId
          );
        }
        return bookList;
      });
    case ADD_BOOK_TO_LIST:
      return state.map(bookList => {
        if (bookList.id === action.data.bookListId) {
          bookList.booksAdded.push(action.data.book);
        }
        return bookList;
      });

    default:
      return state;
  }
}
