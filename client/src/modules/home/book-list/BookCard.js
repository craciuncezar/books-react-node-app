import React from "react";

const BookCard = ({ book, children }) => {
  return (
    <div className="col-md-6 mb-2 center-block">
      <div className="card">
        <img className="card-img-top" src={book.imgUrl} alt="Card cap" />
        <div className="card-body">
          <h3 className="card-text">{book.title}</h3>
          <p className="card-text">
            <small className="text-muted">Author: {book.author}</small>
          </p>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: book.description
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
