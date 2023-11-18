import Cards from "../Cards/Cards";
import CurrentPortfolio from "../CurrentPortfolio/CurrentPortfolio";
import "./ContentMain.css";
const ContentMain = () => {
  return (
    <div className="main-content-holder">
      <div className="content-grid-one">
        <CurrentPortfolio />
        <Cards />
      </div>
    </div>
  );
};

export default ContentMain;
