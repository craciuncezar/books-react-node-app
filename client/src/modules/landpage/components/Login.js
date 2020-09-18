import React, { useState } from "react";
import { connect } from "react-redux";
import { logInUser } from "../../../redux/user/user.actions";
import { validateEmail, validateLength } from "../../common/lib/validation";

const Login = ({ logInUser, toggleHasAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSingInPressed = () => {
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

    setErrors(errors);

    if (validated) {
      logInUser(email, password);
    }
  };

  const renderErrors = () => {
    if (!errors.length) return;

    return errors.map((item, i) => (
      <div
        className="alert alert-dark"
        key={i}
        style={{ whiteSpace: "pre-wrap" }}
        role="alert"
      >
        {item}
      </div>
    ));
  };

  return (
    <div className="form">
      <div className="form-group">
        <h2>Sign in</h2>
        {renderErrors()}
        <input
          className="form-control mx-auto"
          type="email"
          aria-describedby="emailHelp"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="form-control mx-auto"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="btn btn-primary" onClick={onSingInPressed}>
          Sign In
        </button>
        <h4>
          You don't have an account?{" "}
          <span onClick={toggleHasAccount}>Register here!</span>
        </h4>
      </div>
    </div>
  );
};

export default connect(null, { logInUser })(Login);
