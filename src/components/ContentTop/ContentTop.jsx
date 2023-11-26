import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
const ContentTop = () => {
 
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <h1>Hello {localStorage.getItem("first_name")}</h1>
      </div>
    </div>
  );
};

export default ContentTop;
