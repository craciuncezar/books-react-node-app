import axios from "axios";
import React, { Component } from "react";
import { SERVER } from "../../../config/constants";
import AddBookList from "./AddBookList";
import BookCard from "./BookCard";
import EditBookList from "./EditBookList";

class BookList extends Component {
  state = {
    bookList: [],
    addingList: false,
    editingListId: -1
  };

  editBookList = async bookList => {
    await axios.put(`${SERVER}/bookLists/${bookList.id}`, bookList, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    });

    this.setState({ editingListId: -1 });
    const booklists = this.state.bookList.map(item =>
      item.id !== bookList.id ? item : bookList
    );
    this.setState({ bookList: booklists });
    this.props.bookListsCallback(this.state.bookList);
  };

  async deleteBookList(id) {
    await axios.delete(`${SERVER}/bookLists/${id}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    });
    const booklists = this.state.bookList.filter(item => item.id !== id);
    this.setState({ bookList: booklists });
    this.props.bookListsCallback(this.state.bookList);
  }

  async removeBookFromList(list, book) {
    await axios.delete(`${SERVER}/books/${list.id}/${book.id}`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    });

    list.booksAdded = list.booksAdded.filter(item => item.id !== book.id);
    const bookList = this.state.bookList.map(item =>
      item.id !== list.id ? item : list
    );
    this.setState({ bookList });
    this.props.bookListsCallback(this.state.bookList);
  }

  addBookList = async bookList => {
    const bookListPayload = await axios.post(`${SERVER}/bookLists`, bookList, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    });

    this.setState({ addingList: false });
    bookList.id = bookListPayload.data.id;
    this.setState({ bookList: [...this.state.bookList, bookList] });
    this.props.bookListsCallback(this.state.bookList);
  };

  async componentDidMount() {
    const bookListsPayload = await axios.get(`${SERVER}/bookLists`, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    });
    let bookLists = bookListsPayload.data;

    bookLists.forEach(async bookList => {
      const books = await axios.get(`${SERVER}/books/${bookList.id}`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      });
      bookList.booksAdded = [...books.data];
      this.setState({ bookList: bookLists });
      this.props.bookListsCallback(this.state.bookList);
    });
  }

  render() {
    return (
      <div className="container" id="bookListsContainer">
        <div className="row">
          <div className="col-sm-10">
            <div className="display-4 booklists">My book lists:</div>
          </div>
          <div className="col-sm-2">
            <div
              className="btn btn-success btn-lg btnAddList"
              onClick={() => {
                this.state.addingList
                  ? this.setState({ addingList: false })
                  : this.setState({ addingList: true });
              }}
            >
              <span className="glyphicon glyphicon-plus" /> ADD
            </div>
          </div>
          {this.state.addingList && (
            <AddBookList addBookList={this.addBookList} />
          )}
        </div>
        {this.state.bookList.map(bkList => {
          return (
            <div className="row" key={bkList.name}>
              <div className="card custom-card">
                <div className="row">
                  <div className="col-sm-8">
                    {this.state.editingListId !== -1 &&
                    bkList.id === this.state.editingListId ? (
                      <EditBookList
                        bookList={bkList}
                        editBookList={this.editBookList}
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
                        this.state.editingListId === -1
                          ? this.setState({ editingListId: bkList.id })
                          : this.setState({ editingListId: -1 });
                      }}
                    >
                      <span className="glyphicon glyphicon-pencil" /> EDIT
                    </div>
                    <div
                      className="btn btn-success btn-lg btnAddList"
                      style={{ margin: "2px" }}
                      onClick={() => this.deleteBookList(bkList.id)}
                    >
                      <span className="glyphicon glyphicon-remove" /> REMOVE
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  {bkList.booksAdded &&
                    bkList.booksAdded.map(book => {
                      return (
                        <BookCard key={book.title} book={book}>
                          <button
                            className="btn btn-danger remove-book-btn"
                            type="button"
                            onClick={() =>
                              this.removeBookFromList(bkList, book)
                            }
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
  }
}

export default BookList;
