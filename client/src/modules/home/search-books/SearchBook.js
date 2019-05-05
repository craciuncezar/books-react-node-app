import axios from "axios";
import React, { Component } from "react";
import { PulseLoader } from "react-spinners";
import {
  GOOGLE_BOOKS_API_URL,
  GOOGLE_KEY,
  SERVER
} from "../../../config/constants";
import { Dropdown } from "../../common/components/Dropdown";
import BookCard from "../book-list/BookCard";

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
      .post(`${SERVER}/books/${list.id}`, book, {
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

      axios
        .get(`${GOOGLE_BOOKS_API_URL}?q=${this.state.query}&key=${GOOGLE_KEY}`)
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
        .catch(() => {
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
          placeholder="Type the book name and press enter..."
          onChange={event => this.setState({ query: event.target.value })}
          onKeyPress={event => event.key === "Enter" && this.search()}
        />
        {this.state.loading && (
          <div className="sweet-loading mx-auto">
            <PulseLoader
              sizeUnit={"px"}
              size={30}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
        )}
        {Object.keys(this.state.book).length !== 0 && (
          <div className="row mt-5">
            <BookCard book={this.state.book}>
              <Dropdown
                buttonText="ADD TO BOOKLIST"
                listItems={this.props.bookLists}
                onItemClicked={this.addBookToList}
              />
            </BookCard>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBook;
