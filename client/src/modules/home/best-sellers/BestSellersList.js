import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SERVER } from "../../../config/constants";
import { addBookToList } from "../../../redux/bookLists/bookLists.actions";
import { BestSellersCategory } from "./BestSellersCategory";

class BestSellersList extends Component {
  state = {
    bestSellersCategories: []
  };

  async componentDidMount() {
    const { data } = await axios.get(`${SERVER}/bestSellers`, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    });
    this.setState({ bestSellersCategories: data });
  }

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
              addBookToList={this.props.addBookToList}
              key={bestSellersCategory.name}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token
  };
}

const mapDispatchToProps = {
  addBookToList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BestSellersList);
