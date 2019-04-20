import React, { Component } from "react";
import HomeFeatures from "./Home/HomeFeatures";
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";
import BookList from "./BookList/BookList";
import SearchBook from "./SearchBook";
import Cookies from "js-cookie";
import Discover from "./Discover";
import Main from "./Home/Main";

class App extends Component {
  state = {
    token: "",
    name: "",
    bookLists: []
  };

  bookListsCallback = value => {
    this.setState({ bookLists: value });
  };

  callbackLogin = response => {
    this.setState({ token: response.token, name: response.name });
    Cookies.set("token", response.token);
  };

  signOut = () => {
    this.setState({ token: "", name: "", bookLists: [] });
    Cookies.remove("token");
  };

  componentDidMount() {
    this.setState({ token: Cookies.get("token") || "" });
  }

  render() {
    if (this.state.token === "") {
      return (
        <div className="App">
          <Main callbackLogin={this.callbackLogin} />
          <HomeFeatures />
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="App">
          <MyNavbar signOut={this.signOut} />
          <Discover
            bookLists={this.state.bookLists}
            token={this.state.token}
            bookListsCallback={this.bookListsCallback}
          />
          <SearchBook
            bookListsCallback={this.bookListsCallback}
            bookLists={this.state.bookLists}
            token={this.state.token}
          />
          <BookList
            bookListsCallback={this.bookListsCallback}
            token={this.state.token}
          />
          <Footer />
        </div>
      );
    }
  }
}

export default App;
