import React, { useEffect } from "react";
import { connect } from "react-redux";
import Home from "./modules/home";
import LandPage from "./modules/landpage";
import { setTokenFromStorage } from "./redux/user/user.actions";

const App = ({ user, setToken }) => {
  useEffect(() => {
    const token = window.localStorage.getItem("jwt-token") || "";
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  if (user.token === "") {
    return <LandPage />;
  } else {
    return <Home />;
  }
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  setToken: setTokenFromStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
