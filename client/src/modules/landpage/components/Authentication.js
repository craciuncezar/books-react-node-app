import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Authentication = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const toggleHasAccount = () => setHasAccount((prev) => !prev);

  return (
    <div className="img-home">
      <div className="caption">
        <h1 className="display-3">Books Club</h1>
        <h2 className="display-4">Your reading companion.</h2>
        {hasAccount ? (
          <Login toggleHasAccount={toggleHasAccount} />
        ) : (
          <Register toggleHasAccount={toggleHasAccount} />
        )}
      </div>
    </div>
  );
};

export default Authentication;
