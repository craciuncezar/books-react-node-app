import React from "react";
import logo from "../../../assets/img/book_logo.png";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-xs-8">
            <img
              src={logo}
              width="80"
              height="70"
              className="d-inline-block align-self-center"
              alt="logo"
            />
            <span>
              Powered By <a href="https://www.goodreads.com/">GoodReads</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
