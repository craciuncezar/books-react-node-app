import React from "react";
import { Dropdown } from "../../common/components/Dropdown";
import BookCard from "../book-list/BookCard";

export const BestSellersCategory = ({
  categoryName,
  books,
  bookLists,
  addBookToList
}) => {
  return (
    <div>
      <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
      <div className="row mt-5">
        {books.map(book => {
          return (
            <BookCard key={book.title} book={book}>
              <Dropdown
                buttonText="ADD TO BOOKLIST"
                listItems={bookLists}
                onItemClicked={list => addBookToList(list, book)}
              />
            </BookCard>
          );
        })}
      </div>
    </div>
  );
};
