import axios from "axios";
import { SERVER } from "../../config/constants";

export const fetchBookLists = () => async (dispatch, getState) => {
  const token = getState().user.token;
  const bookListsPayload = await axios.get(`${SERVER}/bookLists`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  let bookLists = bookListsPayload.data;
  await Promise.all(
    bookLists.map(async bookList => {
      const books = await axios.get(`${SERVER}/books/${bookList.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      bookList.booksAdded = [...books.data];
    })
  );
  dispatch({ type: BookListsActionTypes.FETCH_BOOKLISTS, data: bookLists });
};

export const addBookList = bookList => async (dispatch, getState) => {
  const token = getState().user.token;

  const bookListPayload = await axios.post(`${SERVER}/bookLists`, bookList, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  bookList.id = bookListPayload.data.id;
  dispatch({
    type: BookListsActionTypes.ADD_BOOKLIST,
    data: bookList
  });
};

export const editBookList = bookList => (dispatch, getState) => {
  const token = getState().user.token;

  axios.put(`${SERVER}/bookLists/${bookList.id}`, bookList, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  dispatch({
    type: BookListsActionTypes.EDIT_BOOKLIST,
    data: bookList
  });
};
export const deleteBookList = ({ id }) => async (dispatch, getState) => {
  const token = getState().user.token;

  await axios.delete(`${SERVER}/bookLists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  dispatch({
    type: BookListsActionTypes.DELETE_BOOKLIST,
    data: id
  });
};

export const removeBookFromList = (list, book) => async (
  dispatch,
  getState
) => {
  const token = getState().user.token;

  await axios.delete(`${SERVER}/books/${list.id}/${book.id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  dispatch({
    type: BookListsActionTypes.REMOVE_BOOK_FROM_BOOKLIST,
    data: {
      bookListId: list.id,
      bookId: book.id
    }
  });
};

export const addBookToList = (list, book) => async (dispatch, getState) => {
  const token = getState().user.token;
  const { data } = await axios.post(`${SERVER}/books/${list.id}`, book, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  book.id = data.id;
  dispatch({
    type: BookListsActionTypes.ADD_BOOK_TO_LIST,
    data: {
      bookListId: list.id,
      book
    }
  });
};

export const BookListsActionTypes = {
  FETCH_BOOKLISTS: "/bookLists/FETCH_BOOKLISTS",
  ADD_BOOKLIST: "/bookLists/ADD_BOOKLIST",
  EDIT_BOOKLIST: "/bookLists/EDIT_BOOKLIST",
  DELETE_BOOKLIST: "/bookLists/DELETE_BOOKLIST",
  REMOVE_BOOK_FROM_BOOKLIST: "/bookLists/REMOVE_BOOK_FROM_BOOKLIST",
  ADD_BOOK_TO_LIST: "/bookLists/ADD_BOOK_TO_LIST"
};
