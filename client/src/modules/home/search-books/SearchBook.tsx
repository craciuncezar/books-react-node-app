import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { GOOGLE_BOOKS_API_URL, GOOGLE_KEY } from "../../../config/constants";
import { addBookToList } from "../../../redux/bookLists/bookLists.actions";
import { Book, BookList } from "../../../redux/bookLists/bookLists.reducer";
import { Dropdown } from "../../common/components/Dropdown";
import { BookCard } from "../book-list/BookCard";

interface SearchBookProps {
  bookLists: BookList[];
  addBookToList: (list: BookList, book: Book) => void;
}

const SearchBook = ({ bookLists, addBookToList }: SearchBookProps) => {
  const [query, setQuery] = useState("");
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  function addBook(list: BookList, book: Book) {
    addBookToList(list, {
      ...book,
      description: book.description.slice(0, 230) + "...",
    });
  }

  function search() {
    if (query === "") return;

    setLoading(true);
    setBook(null);

    axios
      .get(`${GOOGLE_BOOKS_API_URL}?q=${query}&key=${GOOGLE_KEY}`)
      .then((res) => {
        const data = res.data.items[0].volumeInfo;
        setBook({
          title: data.title,
          author: data.authors[0],
          description: data.description,
          imgUrl: data.imageLinks.thumbnail,
        } as Book);
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
          <PulseLoader size={30} color={"#123abc"} loading={loading} />
        </div>
      )}
      {book && (
        <div className="row mt-5">
          <BookCard book={book}>
            <Dropdown
              buttonText="ADD TO BOOKLIST"
              listItems={bookLists}
              onItemClicked={(list) => addBook(list, book)}
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
