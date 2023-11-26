import React, { useState, useEffect } from 'react';
import InvestmentHistory from "../CurrentPortfolio/InvestmentHistory";
import Portfolio from "../CurrentPortfolio/Portfolio";
import { ReloadProvider } from '../../context/ReloadContext';
import Goals from '../CurrentPortfolio/Goals';
import Fire from '../CurrentPortfolio/Fire';
import Admin from '../CurrentPortfolio/Admin';
import "./ContentMain.css";
const ContentMain = () => {
  const [refreshSignal, setRefreshSignal] = useState(false);
  const toggleRefreshSignal = () => {
    setRefreshSignal((prevSignal) => !prevSignal);
  };
  useEffect(() => {
    console.log(localStorage.getItem("is_superuser"))
  },[refreshSignal])
  return (
    <ReloadProvider>
    <div className="main-content-holder">
      <div className="content-grid-one">
       {JSON.parse(localStorage.getItem("is_superuser"))? <Admin/>:<></>}
      <Portfolio/>
        <InvestmentHistory />
        
        <Goals />
        <Fire/>
      </div>
    </div>
    </ReloadProvider>
  );
};

export default ContentMain;
