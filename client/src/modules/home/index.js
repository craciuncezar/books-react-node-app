import React from "react";
import { connect } from "react-redux";
import { fetchBookLists } from "../../redux/bookLists/bookLists.actions";
import Footer from "../common/components/Footer";
import Navbar from "../common/components/Navbar";
import BookList from "../home/book-list/BookList";
import SearchBook from "../home/search-books/SearchBook";
import BestSellersList from "./best-sellers/BestSellersList";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchBookLists();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <BestSellersList bookLists={this.props.bookLists} />
        <SearchBook bookLists={this.props.bookLists} />
        <BookList bookLists={this.props.bookLists} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ bookLists }) {
  return {
    bookLists
  };
}

const mapDispatchToProps = {
  fetchBookLists
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
