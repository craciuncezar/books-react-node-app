import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBookLists } from "../../redux/bookLists/bookLists.actions";
import { Footer } from "../common/components/Footer";
import Navbar from "../common/components/Navbar";
import BookList from "../home/book-list/BookList";
import SearchBook from "../home/search-books/SearchBook";
import BestSellersList from "./best-sellers/BestSellersList";

const Home = ({ fetchBookLists, bookLists }) => {
  useEffect(() => {
    fetchBookLists();
  }, [fetchBookLists]);

  return (
    <div className="App">
      <Navbar />
      <BestSellersList bookLists={bookLists} />
      <SearchBook bookLists={bookLists} />
      <BookList bookLists={bookLists} />
      <Footer />
    </div>
  );
};

function mapStateToProps({ bookLists }) {
  return {
    bookLists,
  };
}

const mapDispatchToProps = {
  fetchBookLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
