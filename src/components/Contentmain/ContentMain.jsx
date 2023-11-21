import React, { useState, useEffect } from 'react';
import Cards from "../Cards/Cards";
import InvestmentHistory from "../CurrentPortfolio/InvestmentHistory";
import Portfolio from "../CurrentPortfolio/Portfolio";
import { ReloadProvider } from '../../state/ReloadContext';
import "./ContentMain.css";
const ContentMain = () => {
  const [refreshSignal, setRefreshSignal] = useState(false);
  const toggleRefreshSignal = () => {
    setRefreshSignal((prevSignal) => !prevSignal);
  };
  useEffect(() => {},[refreshSignal])
  return (
    <ReloadProvider>
    <div className="main-content-holder">
      <div className="content-grid-one">
      <Portfolio/>
        <InvestmentHistory />
        
        <Cards />
      </div>
    </div>
    </ReloadProvider>
  );
};

export default ContentMain;
