import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SERVER } from "../../../config/constants";
import { addBookToList } from "../../../redux/bookLists/bookLists.actions";
import { Book, BookList } from "../../../redux/bookLists/bookLists.reducer";
import { ReduxStore } from "../../../redux/reducer";
import { BestSellersCategory } from "./BestSellersCategory";

interface BestSellersListProps {
  token: string;
  bookLists: BookList[];
  addBookToList: (list: BookList, book: Book) => void;
}

interface BestSellersCategory {
  name: string;
  books: Book[];
}

const BestSellersList = ({
  token,
  bookLists,
  addBookToList,
}: BestSellersListProps) => {
  const [bestSellersCategories, setBestSellersCategories] = useState<
    BestSellersCategory[]
  >([]);

  useEffect(() => {
    axios
      .get<BestSellersCategory[]>(`${SERVER}/bestSellers`, {
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

function mapStateToProps(state: ReduxStore) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  addBookToList,
};

export default connect(mapStateToProps, mapDispatchToProps)(BestSellersList);
