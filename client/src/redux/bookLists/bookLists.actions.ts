import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { SERVER } from "../../config/constants";
import { ReduxStore } from "../reducer";
import { Book, BookList } from "./bookLists.reducer";

export const fetchBookLists = (): ThunkAction<
  void,
  ReduxStore,
  null,
  BookListAction
> => async (dispatch, getState) => {
  const token = getState().user.token;
  const { data: bookLists } = await axios.get<BookList[]>(
    `${SERVER}/bookLists`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  await Promise.all(
    bookLists.map(async (bookList) => {
      const books = await axios.get(`${SERVER}/books/${bookList.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      bookList.booksAdded = [...books.data];
    })
  );
  dispatch({ type: "/bookLists/BOOKLISTS_RECEIVED", payload: bookLists });
};

export const addBookList = (
  bookList: Pick<BookList, "name" | "description">
): ThunkAction<void, ReduxStore, null, BookListAction> => async (
  dispatch,
  getState
) => {
  const token = getState().user.token;

  const bookListPayload = await axios.post<BookList>(
    `${SERVER}/bookLists`,
    bookList,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: "/bookLists/ADD_BOOKLIST",
    payload: bookListPayload.data,
  });
};

export const editBookList = (
  bookList: BookList
): ThunkAction<void, ReduxStore, null, BookListAction> => (
  dispatch,
  getState
) => {
  const token = getState().user.token;

  axios.put(`${SERVER}/bookLists/${bookList.id}`, bookList, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({
    type: "/bookLists/EDIT_BOOKLIST",
    payload: bookList,
  });
};
export const deleteBookList = ({
  id,
}: BookList): ThunkAction<void, ReduxStore, null, BookListAction> => async (
  dispatch,
  getState
) => {
  const token = getState().user.token;

  await axios.delete(`${SERVER}/bookLists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({
    type: "/bookLists/DELETE_BOOKLIST",
    payload: id,
  });
};

export const removeBookFromList = (
  list: BookList,
  book: Book
): ThunkAction<void, ReduxStore, null, BookListAction> => async (
  dispatch,
  getState
) => {
  const token = getState().user.token;

  await axios.delete(`${SERVER}/books/${list.id}/${book.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch({
    type: "/bookLists/REMOVE_BOOK_FROM_BOOKLIST",
    payload: {
      listId: list.id,
      bookId: book.id,
    },
  });
};

export const addBookToList = (
  list: BookList,
  book: Book
): ThunkAction<void, ReduxStore, null, BookListAction> => async (
  dispatch,
  getState
) => {
  const token = getState().user.token;
  const { data } = await axios.post(`${SERVER}/books/${list.id}`, book, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  book.id = data.id;
  dispatch({
    type: "/bookLists/ADD_BOOK_TO_LIST",
    payload: {
      listId: list.id,
      book,
    },
  });
};

export type BookListAction =
  | {
      type: "/bookLists/BOOKLISTS_RECEIVED";
      payload: BookList[];
    }
  | { type: "/bookLists/ADD_BOOKLIST"; payload: BookList }
  | { type: "/bookLists/EDIT_BOOKLIST"; payload: BookList }
  | { type: "/bookLists/DELETE_BOOKLIST"; payload: number }
  | {
      type: "/bookLists/REMOVE_BOOK_FROM_BOOKLIST";
      payload: { bookId: number; listId: number };
    }
  | {
      type: "/bookLists/ADD_BOOK_TO_LIST";
      payload: { book: Book; listId: number };
    };
