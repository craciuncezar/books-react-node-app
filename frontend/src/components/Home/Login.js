import React, { Component } from "react";
import axios from "axios";
import constants from "../../config/constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveAccount: true,
      name: "",
      password: "",
      email: "",
      errors: []
    };
  }

  signIn() {
    let userDetails = {
      email: this.state.email,
      password: this.state.password
    };
    let validated = true;
    let errors = [];
    if (!this.validateEmail(userDetails.email)) {
      validated = false;
      errors.push("Email is not valid!");
    }
    if (!this.validateLength(userDetails.password)) {
      validated = false;
      errors.push("Password must be at least 8 chars!");
    }
    this.setState({ errors });
    if (validated)
      axios
        .post(constants.SERVER + "/users/login", userDetails)
        .then(response => {
          this.props.callbackLogin(response.data);
        })
        .catch(err => this.setState({ errors: [err.response.data.error] }));
  }

  signUp() {
    let userDetails = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email
    };
    let validated = true;
    let errors = [];
    if (!this.validateLength(userDetails.name)) {
      validated = false;
      errors.push("Name must be at least 8 chars!");
    }
    if (!this.validateEmail(userDetails.email)) {
      validated = false;
      errors.push("Email is not valid!");
    }
    if (!this.validateLength(userDetails.password)) {
      validated = false;
      errors.push("Password must be at least 8 chars!");
    }
    this.setState({ errors });
    if (validated)
      axios
        .post(constants.SERVER + "/users/register", userDetails)
        .then(response => {
          this.props.callbackLogin(response.data);
        })
        .catch(err => this.setState({ errors: [err.response.data.error] }));
  }

  validateEmail(email) {
    var re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validateLength(password) {
    return password.trim().length >= 8;
  }

  render() {
    if (this.state.haveAccount) {
      return (
        <div className="form">
          <div className="form-group">
            <h2>Sign In</h2>
            {this.state.errors.length > 0
              ? this.state.errors.map((item, i) => (
                  <div
                    className="alert alert-dark"
                    key={i}
                    style={{ whiteSpace: "pre-wrap" }}
                    role="alert"
                  >
                    {item}
                  </div>
                ))
              : null}
            <input
              className="form-control mx-auto "
              type="text"
              required="required"
              placeholder="Enter Email"
              onChange={event => this.setState({ email: event.target.value })}
            />
            <input
              className="form-control mx-auto"
              type="password"
              placeholder="Enter Password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
            <button className="btn btn-primary" onClick={() => this.signIn()}>
              Sign In
            </button>
            <h4>
              You don't have an account?{" "}
              <span
                onClick={() =>
                  this.setState({ haveAccount: false, errors: [] })
                }
              >
                Register here!
              </span>
            </h4>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="form">
            <div className="form-group">
              <h2>Sign Up</h2>
              {this.state.errors.length > 0
                ? this.state.errors.map((item, i) => (
                    <div
                      className="alert alert-dark"
                      key={i}
                      style={{ whiteSpace: "pre-wrap" }}
                      role="alert"
                    >
                      {item}
                    </div>
                  ))
                : null}
              <input
                className="form-control mx-auto"
                type="text"
                placeholder="Name"
                onChange={event => this.setState({ name: event.target.value })}
              />
              <input
                className="form-control mx-auto"
                type="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={event => this.setState({ email: event.target.value })}
              />
              <input
                className="form-control mx-auto"
                type="password"
                placeholder="Password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.signUp()}
              >
                Sign Up
              </button>
              <h4>
                You have an account?{" "}
                <span
                  onClick={() =>
                    this.setState({ haveAccount: true, errors: [] })
                  }
                >
                  Sing in here!
                </span>
              </h4>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
