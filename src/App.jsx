import "./App.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import ContentTop from "./components/ContentTop/ContentTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentMain from "./components/Contentmain/ContentMain";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";
import React from "react";
import StickyHeadTable from "./components/Table/StickyHeadTable";
import OptimizePortpolio from "./components/Pages/OptimizePortpolio/OptimizePortpolio";
import Info from "./components/Pages/Info/Info";
function App() {
  return (
    <React.StrictMode>
      <div className="app">
        <BrowserRouter>
          <Sidebar />
          <div className="main-content">
            <ContentTop />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<ContentMain />} />
              <Route path="/home" element={<StickyHeadTable />} />
              <Route path="/optimize" element={<OptimizePortpolio />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
}

export default App;
