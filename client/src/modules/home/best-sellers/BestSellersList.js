import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SERVER } from "../../../config/constants";
import { addBookToList } from "../../../redux/bookLists/bookLists.actions";
import { BestSellersCategory } from "./BestSellersCategory";

const BestSellersList = ({ token, bookLists, addBookToList }) => {
  const [bestSellersCategories, setBestSellersCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER}/bestSellers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setBestSellersCategories(data));
  }, [token]);

  return (
    <div className="Discover mt-4" id="discover">
      <div className="container">
        <h1>Bestsellers lists</h1>
        {bestSellersCategories.map((bestSellersCategory) => (
          <BestSellersCategory
            categoryName={bestSellersCategory.name}
            books={bestSellersCategory.books}
            bookLists={bookLists}
            addBookToList={addBookToList}
            key={bestSellersCategory.name}
          />
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  addBookToList,
};

export default connect(mapStateToProps, mapDispatchToProps)(BestSellersList);
