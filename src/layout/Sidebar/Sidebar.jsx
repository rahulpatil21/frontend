import { useEffect, useState } from "react";
import { personsImgs } from "../../utils/images";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { Link } from "react-router-dom";
import { iconsImgs } from "../../utils/images";

const Sidebar = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const navigationLinks = [
    { id: 1, title: "Super User", image: iconsImgs.home,ref:"SuperUser" },
    { id: 2, title: "User", image: iconsImgs.budget ,ref:"User" },
    { id: 3, title: "Portfolio", image: iconsImgs.plane,ref:"Portfolio"  },
    { id: 4, title: "Investment History", image: iconsImgs.wallet ,ref:"InvestmentHistory" },
    { id: 5, title: "Goals", image: iconsImgs.bills,ref:"Goals"  },
    { id: 6, title: "Retirement Plan", image: iconsImgs.report ,ref:"RetirementPlan" },
  ];
  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile image" />
        </div>
        <span className="info-name">alice-doe</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              <Link
                to={"/info"}
                className={`nav-link ${
                  navigationLink.id === activeLinkIdx ? "active" : null
                }`}
                onClick={() => setActiveLinkIdx(navigationLink.id)}
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
