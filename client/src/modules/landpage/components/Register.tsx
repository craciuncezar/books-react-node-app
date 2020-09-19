import React, { useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../../redux/user/user.actions";
import { validateEmail, validateLength } from "../../common/lib/validation";

interface RegisterProps {
  registerUser: (email: string, password: string, name: string) => void;
  toggleHasAccount: () => void;
}

const Register = ({ registerUser, toggleHasAccount }: RegisterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const onSignUpPressed = () => {
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
    setErrors(errors);

    if (validated) {
      registerUser(email, password, name);
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
        <h2>Sign up</h2>
        {renderErrors()}
        <input
          className="form-control mx-auto"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
        <button
          className="btn btn-primary"
          type="button"
          onClick={onSignUpPressed}
        >
          Sign Up
        </button>
        <h4>
          You have an account?{" "}
          <span onClick={toggleHasAccount}>Sing in here!</span>
        </h4>
      </div>
    </div>
  );
};

export default connect(null, { registerUser })(Register);
