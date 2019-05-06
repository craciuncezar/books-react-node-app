import React from "react";
import { connect } from "react-redux";
import imgLogo from "../../../assets/img/book_logo_icon.png";
import { logOutUser } from "../../../redux/user/user.actions";

const Navbar = props => {
  return (
    <ul className="topnav sticky">
      <li>
        <img src={imgLogo} alt="logo" />
      </li>
      <li className="brandTitle">Books Club</li>
      <li>
        <a href="#discover">Bestsellers</a>
      </li>
      <li>
        <a href="#searchArea">Search Book</a>
      </li>
      <li>
        <a href="#bookListsContainer">My Book Lists</a>
      </li>
      <li className="right">
        <a href="#home" onClick={() => props.logOutUser()}>
          Sign Out
        </a>
      </li>
    </ul>
  );
};

export default connect(
  null,
  { logOutUser }
)(Navbar);
