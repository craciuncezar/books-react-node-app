import React from "react";
import { Footer } from "../common/components/Footer";
import { Authentication } from "./components/Authentication";
import { HomeFeatures } from "./components/HomeFeatures";

const LandPage = () => {
  return (
    <div className="App">
      <Authentication />
      <HomeFeatures />
      <Footer />
    </div>
  );
};

export default LandPage;
