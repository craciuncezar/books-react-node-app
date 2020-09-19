import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBookLists } from "../../redux/bookLists/bookLists.actions";
import { BookList as BookListType } from "../../redux/bookLists/bookLists.reducer";
import { ReduxStore } from "../../redux/reducer";
import { Footer } from "../common/components/Footer";
import Navbar from "../common/components/Navbar";
import BookList from "../home/book-list/BookList";
import SearchBook from "../home/search-books/SearchBook";
import BestSellersList from "./best-sellers/BestSellersList";

interface HomeProps {
  fetchBookLists: () => void;
  bookLists: BookListType[];
}

const Home = ({ fetchBookLists, bookLists }: HomeProps) => {
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

function mapStateToProps({ bookLists }: ReduxStore) {
  return {
    bookLists,
  };
}

const mapDispatchToProps = {
  fetchBookLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
