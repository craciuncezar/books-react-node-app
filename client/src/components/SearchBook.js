import React, { Component } from "react";
import constants from "../config/constants";
import axios from "axios";
import { PulseLoader } from "react-spinners";

class SearchBook extends Component {
  state = {
    query: "",
    book: {},
    loading: false
  };

  addBookToList = list => {
    let book = this.state.book;
    book.description = book.description.slice(0, 230) + "...";
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
        this.setState({ book: {} });
      })
      .catch(err => console.log(err));
  };

  search() {
    if (this.state.query !== "") {
      this.setState({ loading: true, book: {} });
      let URL = `https://www.googleapis.com/books/v1/volumes?q=${
        this.state.query
      }&key=${constants.googleKey}`;

      axios
        .get(URL)
        .then(res => {
          var data = res.data.items[0].volumeInfo;
          var book = {
            title: data.title,
            author: data.authors[0],
            description: data.description,
            imgUrl: data.imageLinks.thumbnail
          };
          this.setState({ book, loading: false });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  }

  render() {
    return (
      <div className="container text-center" id="searchArea">
        <div className="display-2">Search the book by name!</div>
        <input
          type="text"
          className="form-control form-control-lg text-center"
          id="searchBookInput"
          placeholder="Type the book name..."
          onChange={event => this.setState({ query: event.target.value })}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.search();
            }
          }}
        />
        <div className="sweet-loading mx-auto">
          <PulseLoader
            sizeUnit={"px"}
            size={30}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        {Object.keys(this.state.book).length === 0 ? (
          <div />
        ) : (
          <div className="row mt-5">
            <div className="col-md-6 offset-md-3 mb-4">
              <div className="card">
                <img
                  className="card-img-top"
                  src={this.state.book.imgUrl}
                  alt="Card cap"
                />
                <div className="card-body">
                  <h3 className="card-text">{this.state.book.title}</h3>
                  <p className="card-text">
                    <small className="text-muted">
                      Author: {this.state.book.author}
                    </small>
                  </p>
                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html: this.state.book.description
                    }}
                  />
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
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
                      {this.props.bookLists.map(element => {
                        return (
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => this.addBookToList(element)}
                          >
                            {element.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBook;
