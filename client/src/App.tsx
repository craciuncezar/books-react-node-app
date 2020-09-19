import React from "react";
import { connect } from "react-redux";
import Home from "./modules/home";
import { LandPage } from "./modules/landpage";
import { User } from "./redux/user/user.reducer";

interface AppProps {
  user: User;
}

const App: React.FC<AppProps> = ({ user }) => {
  return user.token === "" ? <LandPage /> : <Home />;
};

function mapStateToProps(state: { user: User }) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
