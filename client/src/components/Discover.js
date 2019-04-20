import React, { Component } from "react";
import constants from "../config/constants";
import axios from "axios";

class Discover extends Component {
  state = {
    booksLists: []
  };

  componentDidMount() {
    axios
      .get(`${constants.SERVER}/bestSellers`, {
        headers: { Authorization: `Bearer ${this.props.token}` }
      })
      .then(response => {
        this.setState({ booksLists: response.data });
      })
      .catch(err => console.log(err));
  }

  addBookToList(list, book) {
    axios
      .post(constants.SERVER + "/books/" + list.id, book, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(results => {
        book.id = results.data.id;
        list.booksAdded.push(book);
        this.props.bookListsCallback(this.props.bookLists);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="Discover mt-4" id="discover">
        <div className="container">
          <h1>Bestsellers lists</h1>
          {this.state.booksLists.map(el => {
            return (
              <div key={el.name}>
                <h2>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</h2>
                <div className="row mt-5">
                  {el.books.map(book => {
                    return (
                      <div key={book.title} className="col-md-6 mb-4">
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
                            <p className="card-text">{book.description}</p>
                            <div className="dropdown">
                              <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                ADD TO BOOKLIST
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {this.props.bookLists.map(booklist => {
                                  return (
                                    <button
                                      className="dropdown-item"
                                      type="button"
                                      onClick={() =>
                                        this.addBookToList(booklist, book)
                                      }
                                    >
                                      {booklist.name}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Discover;
