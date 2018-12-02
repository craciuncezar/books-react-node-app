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
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      name: "",
      bookLists: []
    };
  }

  bookListsCallback = value => {
    this.setState({ bookLists: value });
  };

  callbackLogin = response => {
    this.setState({ token: response.token, name: response.name });
    Cookies.set("token", response.token);
  };

  signOut = () => {
    this.setState({ token: "" });
    this.setState({ name: "" });
    this.setState({ bookLists: [] });
    Cookies.remove("token");
  };

  componentWillMount() {
    if (Cookies.get("token") !== undefined) {
      this.setState({ token: Cookies.get("token") });
    } else {
      this.setState({ token: "" });
    }
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
