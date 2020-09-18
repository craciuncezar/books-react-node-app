import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addBookList,
  deleteBookList,
  editBookList,
  removeBookFromList,
} from "../../../redux/bookLists/bookLists.actions";
import AddBookList from "./AddBookList";
import BookCard from "./BookCard";
import EditBookList from "./EditBookList";

const BookList = ({
  bookLists,
  addBookList,
  editBookList,
  deleteBookList,
  removeBookFromList,
}) => {
  const [editingListId, setEditingListId] = useState(-1);

  return (
    <div className="container" id="bookListsContainer">
      <div className="row">
        <div className="col-sm-10">
          <div className="display-4 booklists">My book lists:</div>
        </div>
        <AddBookList addBookList={addBookList} />
      </div>
      {bookLists.map((bkList) => {
        return (
          <div className="row" key={bkList.name}>
            <div className="card custom-card">
              <div className="row">
                <div className="col-sm-8">
                  {editingListId !== -1 && bkList.id === editingListId ? (
                    <EditBookList
                      bookList={bkList}
                      editBookList={(bookList) => {
                        editBookList(bookList);
                        setEditingListId(-1);
                      }}
                    />
                  ) : (
                    <div>
                      <h3>Name: {bkList.name}</h3>
                      <h4>Description: {bkList.description}</h4>
                    </div>
                  )}
                </div>
                <div className="col-sm-4">
                  <div
                    className="btn btn-success btn-lg btnAddList"
                    style={{ margin: "2px" }}
                    onClick={() => {
                      setEditingListId((prev) =>
                        prev === -1 ? bkList.id : -1
                      );
                    }}
                  >
                    <span className="glyphicon glyphicon-pencil" /> EDIT
                  </div>
                  <div
                    className="btn btn-success btn-lg btnAddList"
                    style={{ margin: "2px" }}
                    onClick={() => deleteBookList(bkList)}
                  >
                    <span className="glyphicon glyphicon-remove" /> REMOVE
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                {bkList.booksAdded &&
                  bkList.booksAdded.map((book) => {
                    return (
                      <BookCard key={book.title} book={book}>
                        <button
                          className="btn btn-danger remove-book-btn"
                          type="button"
                          onClick={() => removeBookFromList(bkList, book)}
                        >
                          <span className="glyphicon glyphicon-remove" />
                          REMOVE
                        </button>
                      </BookCard>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = {
  deleteBookList,
  editBookList,
  addBookList,
  removeBookFromList,
};

export default connect(null, mapDispatchToProps)(BookList);
