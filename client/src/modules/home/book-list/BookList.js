import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addBookList,
  deleteBookList,
  editBookList,
  removeBookFromList
} from "../../../redux/bookLists/bookLists.actions";
import AddBookList from "./AddBookList";
import BookCard from "./BookCard";
import EditBookList from "./EditBookList";

class BookList extends Component {
  state = {
    editingListId: -1
  };

  render() {
    return (
      <div className="container" id="bookListsContainer">
        <div className="row">
          <div className="col-sm-10">
            <div className="display-4 booklists">My book lists:</div>
          </div>
          <AddBookList addBookList={this.props.addBookList} />
        </div>
        {this.props.bookLists.map(bkList => {
          return (
            <div className="row" key={bkList.name}>
              <div className="card custom-card">
                <div className="row">
                  <div className="col-sm-8">
                    {this.state.editingListId !== -1 &&
                    bkList.id === this.state.editingListId ? (
                      <EditBookList
                        bookList={bkList}
                        editBookList={bookList => {
                          this.props.editBookList(bookList);
                          this.setState({ editingListId: -1 });
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
                      onClick={() => this.props.deleteBookList(bkList)}
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
                              this.props.removeBookFromList(bkList, book)
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

function mapStateToProps(state) {
  return {
    token: state.user.token
  };
}

const mapDispatchToProps = {
  deleteBookList,
  editBookList,
  addBookList,
  removeBookFromList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList);
