import React from "react";
import { Book, BookList } from "../../../redux/bookLists/bookLists.reducer";
import { Dropdown } from "../../common/components/Dropdown";
import { BookCard } from "../book-list/BookCard";

interface BestSellersCategoryProps {
  categoryName: string;
  books: Book[];
  bookLists: BookList[];
  addBookToList: (list: BookList, book: Book) => void;
}

export const BestSellersCategory = ({
  categoryName,
  books,
  bookLists,
  addBookToList,
}: BestSellersCategoryProps) => {
  return (
    <div>
      <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
      <div className="row mt-5">
        {books.map((book) => {
          return (
            <BookCard key={book.title} book={book}>
              <Dropdown
                buttonText="ADD TO BOOKLIST"
                listItems={bookLists}
                onItemClicked={(list) => addBookToList(list, book)}
              />
            </BookCard>
          );
        })}
      </div>
    </div>
  );
};
