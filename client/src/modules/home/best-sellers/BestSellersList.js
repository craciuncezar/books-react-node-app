import axios from "axios";
import React, { Component } from "react";
import { SERVER } from "../../../config/constants";
import { BestSellersCategory } from "./BestSellersCategory";

class BestSellersList extends Component {
  state = {
    bestSellersCategories: []
  };

  async componentDidMount() {
    const bestSellersPayload = await axios.get(`${SERVER}/bestSellers`, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    });
    this.setState({ bestSellersCategories: bestSellersPayload.data });
  }

  addBookToList = async (book, list) => {
    const serverResponse = await axios.post(
      SERVER + "/books/" + list.id,
      book,
      {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      }
    );
    book.id = serverResponse.data.id;
    list.booksAdded.push(book);
    this.props.bookListsCallback(this.props.bookLists);
  };

  render() {
    return (
      <div className="Discover mt-4" id="discover">
        <div className="container">
          <h1>Bestsellers lists</h1>
          {this.state.bestSellersCategories.map(bestSellersCategory => (
            <BestSellersCategory
              categoryName={bestSellersCategory.name}
              books={bestSellersCategory.books}
              bookLists={this.props.bookLists}
              addBookToList={this.addBookToList}
              key={bestSellersCategory.name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BestSellersList;
