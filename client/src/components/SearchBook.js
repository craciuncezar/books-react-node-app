import React, { Component } from "react";
import constants from "../config/constants";
import axios from "axios";
import proxify from "proxify-url";
import { PulseLoader } from "react-spinners";

class SearchBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      book: {},
      loading: false
    };
  }

  addBookToList(list) {
    var book = {
      title: this.state.book.title,
      author: this.state.book.author,
      description: this.state.book.description.slice(0, 230),
      imgUrl: this.state.book.imgUrl
    };
    book.description += "...";
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
  }

  search() {
    if (this.state.query !== "") {
      this.setState({ loading: true, book: {} });
      let URL = `https://www.goodreads.com/search/index.xml?key= ${
        constants.GOODREADS_API.key
      }&q=title=${this.state.query}`;
      URL = encodeURI(URL);
      let proxyURL = proxify(URL, { inputFormat: "xml" });

      axios
        .get(proxyURL)
        .then(res => {
          var data =
            res.data.query.results.GoodreadsResponse.search.results.work[0];
          var book = {
            title: data.best_book.title,
            author: data.best_book.author.name,
            id: data.best_book.id.content,
            imgUrl: data.best_book.image_url
          };
          return book;
        })
        .then(book => {
          // Get description
          const url_description = `https://www.goodreads.com/book/show.xml?key=${
            constants.GOODREADS_API.key
          }&id=${book.id}`;
          const proxyURLD = proxify(url_description, { inputFormat: "xml" });
          axios
            .get(proxyURLD)
            .then(res => {
              var description =
                res.data.query.results.GoodreadsResponse.book.description;
              book.description = description;
              this.setState({ book, loading: false });
            })
            .catch(err => {
              console.log(err);
              this.setState({ loading: false });
            });
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
