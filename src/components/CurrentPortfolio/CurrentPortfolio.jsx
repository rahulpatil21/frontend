import "./CurrentPortfolio.css";
import { iconsImgs } from "../../utils/images";
import DisplayAndEditStock from "../DisplayAndEditStock/DisplayAndEditStock";
import { useState } from "react";
import { AddStock } from "../AddStock/AddStock";

const CurrentPortfolio = () => {
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Investment History</h3>
      </div>

      <DisplayAndEditStock />
    </div>
  );
};

export default CurrentPortfolio;
