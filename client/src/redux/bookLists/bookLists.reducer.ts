import { BookListAction } from "./bookLists.actions";

export type BookList = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  booksAdded: Book[];
};

export type Book = {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  description: string;
  imgUrl: string;
};

export function bookListReducer(
  state: BookList[] = [],
  action: BookListAction
): BookList[] {
  switch (action.type) {
    case "/bookLists/BOOKLISTS_RECEIVED":
      return action.payload;
    case "/bookLists/ADD_BOOKLIST":
      return [...state, action.payload];
    case "/bookLists/EDIT_BOOKLIST":
      return state.map((bookList) =>
        bookList.id === action.payload.id ? action.payload : bookList
      );
    case "/bookLists/DELETE_BOOKLIST":
      return state.filter((bookList) => bookList.id !== action.payload);
    case "/bookLists/REMOVE_BOOK_FROM_BOOKLIST":
      return state
        .filter((bookList) => bookList.id === action.payload.listId)
        .map((bookList) => {
          bookList.booksAdded = bookList.booksAdded.filter(
            (book) => book.id !== action.payload.bookId
          );
          return bookList;
        });
    case "/bookLists/ADD_BOOK_TO_LIST":
      return state
        .filter((bookList) => bookList.id === action.payload.listId)
        .map((bookList) => ({
          ...bookList,
          booksAdded: [...bookList.booksAdded, action.payload.book],
        }));
    default:
      return state;
  }
}
