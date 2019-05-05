import React from "react";
import Login from "./Login";
import Register from "./Register";

class Authentication extends React.Component {
  state = {
    hasAccount: true
  };

  toggleHasAccount = () => {
    const hasAccount = !this.state.hasAccount;
    this.setState({ hasAccount });
  };

  render() {
    return (
      <div className="img-home">
        <div className="caption">
          <h1 className="display-3">Books Club</h1>
          <h2 className="display-4">Your reading companion.</h2>
          {this.state.hasAccount ? (
            <Login
              toggleHasAccount={this.toggleHasAccount}
              callbackLogin={this.props.callbackLogin}
            />
          ) : (
            <Register
              toggleHasAccount={this.toggleHasAccount}
              callbackLogin={this.props.callbackLogin}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Authentication;
