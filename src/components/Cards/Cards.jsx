import { iconsImgs } from "../../utils/images";
import "./Cards.css";

const Cards = () => {
  return (
    <div className="grid-one-item grid-common grid-c1">
      <div>
        <div className="grid-c-title">
          <h3 className="grid-c-title-text">Services</h3>
        </div>

        <div className="row">
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <i className="fa-solid fa-sort-up"></i>
              </div>
              <h3>Service Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam consequatur necessitatibus eaque.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <i className="fas fa-brush"></i>
              </div>
              <h3>Service Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam consequatur necessitatibus eaque.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <i className="fas fa-wrench"></i>
              </div>
              <h3>Service Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam consequatur necessitatibus eaque.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <i className="fas fa-truck-pickup"></i>
              </div>
              <h3>Service Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam consequatur necessitatibus eaque.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <i className="fas fa-broom"></i>
              </div>
              <h3>Service Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam consequatur necessitatibus eaque.
              </p>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="icon-wrapper">
                <i className="fas fa-plug"></i>
              </div>
              <h3>Service Heading</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam consequatur necessitatibus eaque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
