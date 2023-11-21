import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";
import { InvestmentTable } from "../StockTable/InvestmentTable";
import { PortfolioTable } from "../StockTable/PortfolioTable";
import {AddInvestment} from "../AddStock/AddInvestment";
import axios from "axios";
import { useReload } from "../../state/ReloadContext";
import Piechart from "../Diagram/PieChart";
import ComparePieChart from "../Diagram/ComparePieChart";

function DisplayPortfolio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [portfolio, setPortfolio]=useState({})
  const [optimizedPortfolio, setOptimizedPortfolio]=useState()
  const { reloadFlag } = useReload();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let portfolio_reponse = await axios.get("http://127.0.0.1:8000/portfolio/get_portfolio/", {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });
        
        setPortfolio(portfolio_reponse.data)
        setRows(portfolio_reponse.data.equities)
        
      } catch (error) {
        console.error("Error fetching portfolio data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag]); // Empty dependency array ensures this effect runs only once when the component mounts
  
  return (
    <div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Total Investment</h2>
        <span className="lg-value">$ {portfolio.total_portfolio_value}</span>
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Unrealized Portfolio Value</h2>
        <span className="lg-value">$ {rows.reduce((sum, obj) => sum + (obj.shares*obj.new_price), 0).toFixed(2)}</span>
      </div>
      <PortfolioTable rows={rows}/>
      <ComparePieChart  
      portfolio={portfolio}
       optimized_portfolio={optimizedPortfolio?optimizedPortfolio:undefined}
       />
    </div>
  );
}

export default DisplayPortfolio;
