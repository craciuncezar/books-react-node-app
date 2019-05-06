import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/user/user.actions";
import { validateEmail, validateLength } from "../../common/lib/validation";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: []
  };

  onSignUpPressed = () => {
    let { email, password, name } = this.state;
    let validated = true;
    let errors = [];

    if (!validateLength(name)) {
      validated = false;
      errors.push("Name must be at least 8 chars!");
    }
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
      this.props.registerUser(email, password, name);
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
          <h2>Sign up</h2>
          {this.renderErrors()}
          <input
            className="form-control mx-auto"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
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
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onSignUpPressed}
          >
            Sign Up
          </button>
          <h4>
            You have an account?{" "}
            <span onClick={this.props.toggleHasAccount}>Sing in here!</span>
          </h4>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { registerUser }
)(Register);
