import React from "react";
import Footer from "../common/components/Footer";
import Navbar from "../common/components/Navbar";
import BookList from "../home/book-list/BookList";
import SearchBook from "../home/search-books/SearchBook";
import BestSellersList from "./best-sellers/BestSellersList";

const Home = ({ singOutCallback, token, bookLists, bookListsCallback }) => {
  return (
    <div className="App">
      <Navbar signOut={singOutCallback} />
      <BestSellersList
        bookLists={bookLists}
        bookListsCallback={bookListsCallback}
        token={token}
      />
      <SearchBook
        bookLists={bookLists}
        bookListsCallback={bookListsCallback}
        token={token}
      />
      <BookList bookListsCallback={bookListsCallback} token={token} />
      <Footer />
    </div>
  );
};

export default Home;
