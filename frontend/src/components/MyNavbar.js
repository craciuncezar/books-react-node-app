import React, { Component } from "react";
import imgLogo from "../assets/img/book_logo_icon.png";

class MyNavbar extends Component {
  render() {
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
          <a href="#" onClick={() => this.props.signOut()}>
            Sign Out
          </a>
        </li>
      </ul>
    );
  }
}

export default MyNavbar;
