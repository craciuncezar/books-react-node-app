import React from "react";
import Footer from "../common/components/Footer";
import Authentication from "./components/Authentication";
import HomeFeatures from "./components/HomeFeatures";

const LandPage = ({ callbackLogin }) => {
  return (
    <div className="App">
      <Authentication callbackLogin={callbackLogin} />
      <HomeFeatures />
      <Footer />
    </div>
  );
};

export default LandPage;
