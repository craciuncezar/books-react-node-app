import React, { Component } from "react";
import Home from "./modules/home";
import LandPage from "./modules/landpage";

class App extends Component {
  state = {
    token: "",
    name: "",
    bookLists: []
  };

  bookListsCallback = value => {
    this.setState({ bookLists: value });
  };

  callbackLogin = ({ token, name }) => {
    this.setState({ token, name });
    window.localStorage.setItem("jwt-token", token);
  };

  signOut = () => {
    this.setState({ token: "", name: "", bookLists: [] });
    window.localStorage.removeItem("jwt-token");
  };

  componentDidMount() {
    this.setState({ token: window.localStorage.getItem("jwt-token") || "" });
  }

  render() {
    if (this.state.token === "") {
      return <LandPage callbackLogin={this.callbackLogin} />;
    } else {
      return (
        <Home
          token={this.state.token}
          singOutCallback={this.signOut}
          bookLists={this.state.bookLists}
          bookListsCallback={this.bookListsCallback}
        />
      );
    }
  }
}

export default App;
