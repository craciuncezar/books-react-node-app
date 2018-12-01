import React, { Component } from "react";
import axios from "axios";
import constant from "../../config/constants";
import AddingList from "./AddingList";
import EdditingList from "./EdditingList";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      addingList: false,
      edditingList: -1
    };
  }

  editBookList = state => {
    let bookList = {
      name: state.name,
      description: state.description,
      booksAdded: state.booksAdded
    };
    let idEdit = this.state.edditingList;
    console.log(idEdit);
    axios
      .put(constant.SERVER + "/bookLists/" + idEdit, bookList, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(result => {
        bookList.id = idEdit;
        this.setState({ edditingList: -1 });
        var booklists = this.state.bookList;
        booklists = booklists.filter(item => item.id !== idEdit);
        booklists.push(bookList);
        this.setState({ bookList: booklists });
        this.props.bookListsCallback(this.state.bookList);
      })
      .catch(err => console.log(err));
  };

  deleteBookList(id) {
    axios
      .delete(constant.SERVER + "/bookLists/" + id, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(result => {
        var booklists = this.state.bookList;
        booklists = booklists.filter(item => item.id !== id);
        this.setState({ bookList: booklists });
        this.props.bookListsCallback(this.state.bookList);
      })
      .catch(err => console.log(err));
  }

  removeBookFromList(list, book) {
    axios
      .delete(`${constant.SERVER}/books/${list.id}/${book.id}`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(result => {
        var booklists = this.state.bookList;
        booklists = booklists.filter(item => item.id !== list.id);
        list.booksAdded = list.booksAdded.filter(item => item.id !== book.id);
        booklists.push(list);
        this.setState({ bookList: booklists });
        this.props.bookListsCallback(this.state.bookList);
      })
      .catch(err => console.log(err));
  }

  addBookList = state => {
    var bookList = {
      name: state.name,
      description: state.description,
      booksAdded: []
    };
    axios
      .post(constant.SERVER + "/bookLists", bookList, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(result => {
        this.setState({ addingList: false });
        bookList.id = result.data.id;
        var booklists = this.state.bookList;
        booklists.push(bookList);
        this.setState({ bookList: booklists });
        this.props.bookListsCallback(this.state.bookList);
      })
      .catch(err => console.log(err));
  };

  componentWillMount() {
    var bookLists = [];

    axios
      .get(constant.SERVER + "/bookLists", {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(result => {
        result.data.forEach(element => {
          var bookList = {
            id: element.id,
            name: element.name,
            description: element.description,
            booksAdded: []
          };
          axios
            .get(constant.SERVER + "/books/" + element.id, {
              headers: {
                Authorization: `Bearer ${this.props.token}`
              }
            })
            .then(result => {
              result.data.forEach(element => {
                bookList.booksAdded.push(element);
              });
              bookLists.push(bookList);
              this.setState({ bookList: bookLists });
              this.props.bookListsCallback(this.state.bookList);
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err.response));
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
          {this.state.addingList ? (
            <AddingList addBookList={this.addBookList} />
          ) : (
            <div />
          )}
        </div>
        {this.state.bookList.map(bkList => {
          return (
            <div className="row">
              <div className="card custom-card">
                <div className="row">
                  <div className="col-sm-8">
                    {this.state.edditingList !== -1 &&
                    bkList.id === this.state.edditingList ? (
                      <EdditingList
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
                        this.state.edditingList === -1
                          ? this.setState({ edditingList: bkList.id })
                          : this.setState({ edditingList: -1 });
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
                  {bkList.booksAdded.map(book => {
                    return (
                      <div className="col-md-4 mb-2">
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={book.imgUrl}
                            alt="Card cap"
                          />
                          <div className="card-body">
                            <h3 className="card-text">{book.title}</h3>
                            <p className="card-text">
                              <small className="text-muted">
                                Author: {book.author}
                              </small>
                            </p>
                            <p
                              className="card-text"
                              dangerouslySetInnerHTML={{
                                __html: book.description
                              }}
                            />
                            <button
                              className="btn btn-danger remove-book-btn"
                              type="button"
                              onClick={() =>
                                this.removeBookFromList(bkList, book)
                              }
                            >
                              {" "}
                              <span className="glyphicon glyphicon-remove" />{" "}
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
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
