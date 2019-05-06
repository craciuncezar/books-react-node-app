import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "./modules/home";
import LandPage from "./modules/landpage";
import { setTokenFromStorage } from "./redux/user/user.actions";

class App extends Component {
  componentDidMount() {
    const token = window.localStorage.getItem("jwt-token") || "";
    if (token) {
      this.props.setToken(token);
    }
  }

  render() {
    if (this.props.user.token === "") {
      return <LandPage />;
    } else {
      return <Home />;
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  setToken: setTokenFromStorage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
