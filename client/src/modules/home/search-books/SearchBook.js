import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { GOOGLE_BOOKS_API_URL, GOOGLE_KEY } from "../../../config/constants";
import { addBookToList } from "../../../redux/bookLists/bookLists.actions";
import { Dropdown } from "../../common/components/Dropdown";
import BookCard from "../book-list/BookCard";

const SearchBook = ({ bookLists, addBookToList }) => {
  const [query, setQuery] = useState("");
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  function addBook(list) {
    addBookToList(list, {
      ...book,
      description: book.description.slice(0, 230) + "...",
    });
  }

  function search() {
    if (query === "") return;

    setLoading(true);
    setBook({});

    axios
      .get(`${GOOGLE_BOOKS_API_URL}?q=${query}&key=${GOOGLE_KEY}`)
      .then((res) => {
        const data = res.data.items[0].volumeInfo;
        setBook({
          title: data.title,
          author: data.authors[0],
          description: data.description,
          imgUrl: data.imageLinks.thumbnail,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="container text-center" id="searchArea">
      <div className="display-2">Search the book by name!</div>
      <input
        type="text"
        className="form-control form-control-lg text-center"
        id="searchBookInput"
        placeholder="Type the book name and press enter..."
        onChange={(event) => setQuery(event.target.value)}
        onKeyPress={(event) => event.key === "Enter" && search()}
      />
      {loading && (
        <div className="sweet-loading mx-auto">
          <PulseLoader
            sizeUnit={"px"}
            size={30}
            color={"#123abc"}
            loading={loading}
          />
        </div>
      )}
      {Object.keys(book).length !== 0 && (
        <div className="row mt-5">
          <BookCard book={book}>
            <Dropdown
              buttonText="ADD TO BOOKLIST"
              listItems={bookLists}
              onItemClicked={addBook}
            />
          </BookCard>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  addBookToList,
};

export default connect(null, mapDispatchToProps)(SearchBook);
