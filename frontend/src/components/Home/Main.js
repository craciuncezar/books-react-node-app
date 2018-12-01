import React from 'react';
import Login from './Login';


const Main = props => {
    return (
        <div className="img-home">
        <div className="caption">
          <h1 className="display-3">Books Club</h1>
          <h2 className="display-4">Your reading companion.</h2>
          <Login callbackLogin={props.callbackLogin} />
        </div>
      </div>
    );
};

export default Main;