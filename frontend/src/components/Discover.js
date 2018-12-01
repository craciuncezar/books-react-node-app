import React, { Component } from "react";
import constants from "../config/constants";
import axios from "axios";
import placeholder from "../assets/img/book-cover-placeholder.jpg";

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booksLists: [
        {
          name: "Science",
          books: [],
          images: []
        },
        {
          name: "Fiction",
          books: [],
          images: []
        },
        {
          name: "Nonfiction",
          books: [],
          images: []
        }
      ]
    };

    this.lists = [ "science", "hardcover-fiction", "hardcover-nonfiction"];
  }

  componentWillMount() {
    this.lists.forEach((el, index) => {
      axios
        .get("https://api.nytimes.com/svc/books/v3/lists.json", {
          params: {
            "api-key": constants.nyTimesKey,
            list: el
          }
        })
        .then(response => {
          let newBooksLists = this.state.booksLists;
          newBooksLists[index].books = response.data.results;
          newBooksLists[index].books.length = 4;
          this.setState({ booksLists: newBooksLists });
        })
        .then(() => this.getBooksImages())
        .catch(err => console.log(err));
    });
  }
  addBookToList(list, theBook, img) {
    var book = {
      title: theBook.book_details[0].title,
      author: theBook.book_details[0].author,
      description: theBook.book_details[0].description.slice(0, 230),
      imgUrl: img != null ? img : "https://www.chindi-authors.co.uk/wp-content/uploads/2017/02/book-cover-placeholder.jpg"
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
      })
      .catch(err => console.log(err));
  }

  getBooksImages() {
    this.state.booksLists.forEach((el, indexLista) => {
      let images = [];
      let books = el.books;
      books.forEach((book, indexCarte) => {
        axios
          .get("https://www.googleapis.com/books/v1/volumes", {
            params: {
              q: `isbn:${book.book_details[0].primary_isbn10}`,
              key: constants.googleKey
            }
          })
          .then(response => {
            let img = response.data.items[0].volumeInfo.imageLinks.thumbnail;
            img = img.replace(/^http:\/\//i, "https://");
            images[indexCarte] = img;
          })
          .then(() => {
            let booksLists = this.state.booksLists;
            booksLists[indexLista].images = images;
            this.setState({ booksLists });
          })
          .catch(err => console.log(err));
      });
    });
  }

  render() {
    return (
      <div className="Discover mt-4" id="discover">
        <div className="container">
          <h1>Bestsellers lists</h1>
          {this.state.booksLists.map((el, key) => {
            return (
              <div key={key}>
                <h2>{el.name}</h2>
                <div className="row mt-5">
                  {el.books.map((book, index) => {
                    return (
                      <div key={index} className="col-md-6 mb-4">
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={
                              el.images[index] != null
                                ? el.images[index]
                                : placeholder
                            }
                            alt="Card cap"
                          />
                          <div className="card-body">
                            <h3 className="card-text">
                              {book.book_details[0].title}
                            </h3>
                            <p className="card-text">
                              <small className="text-muted">
                                Author: {book.book_details[0].author}
                              </small>
                            </p>
                            <p className="card-text">
                              {book.book_details[0].description}
                            </p>
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
                                {this.props.bookLists.map(element => {
                                  return (
                                    <button
                                      className="dropdown-item"
                                      type="button"
                                      onClick={() =>
                                        this.addBookToList(
                                          element,
                                          book,
                                          el.images[index]
                                        )
                                      }
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
