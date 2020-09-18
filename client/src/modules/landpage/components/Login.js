import React, { Component } from "react";
import { connect } from "react-redux";
import { logInUser } from "../../../redux/user/user.actions";
import { validateEmail, validateLength } from "../../common/lib/validation";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };

  onSingInPressed = () => {
    let { email, password } = this.state;
    let validated = true;
    let errors = [];

    if (!validateEmail(email)) {
      validated = false;
      errors.push("Email is not valid!");
    }
    if (!validateLength(password)) {
      validated = false;
      errors.push("Password must be at least 8 chars!");
    }
    this.setState({ errors });

    if (validated) {
      this.props.logInUser(email, password);
    }
  };

  renderErrors = () => {
    if (this.state.errors.length) {
      return this.state.errors.map((item, i) => (
        <div
          className="alert alert-dark"
          key={i}
          style={{ whiteSpace: "pre-wrap" }}
          role="alert"
        >
          {item}
        </div>
      ));
    }
  };

  render() {
    return (
      <div className="form">
        <div className="form-group">
          <h2>Sign in</h2>
          {this.renderErrors()}
          <input
            className="form-control mx-auto"
            type="email"
            aria-describedby="emailHelp"
            placeholder="Email"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <input
            className="form-control mx-auto"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
          <button className="btn btn-primary" onClick={this.onSingInPressed}>
            Sign In
          </button>
          <h4>
            You don't have an account?{" "}
            <span onClick={this.props.toggleHasAccount}>Register here!</span>
          </h4>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { logInUser }
)(Login);