import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";
import { InvestmentTable } from "../StockTable/InvestmentTable";
import { PortfolioTable } from "../StockTable/PortfolioTable";
import {AddInvestment} from "../AddStock/AddInvestment";
import axios from "axios";
import { useReload } from "../../context/ReloadContext";
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
  const { reloadFlag,setCurrentCagr,currentCagr,optimisedCagr ,setOptimisedCagr} = useReload();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Make the first request
        const portfolioResponse = await axios.get("http://127.0.0.1:8000/portfolio/get_portfolio/", {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });

        // Step 2: Extract data from the first response
        const dataToSend = portfolioResponse.data; 
       
        // Step 3: Make the second request with data from the first response
        const secondResponse = await axios.post("http://127.0.0.1:8000/portfolio/get_optimised_portfolio/", 
          dataToSend,
         {
          headers: {
            Authorization: `Bearer Token ${token}`,
            // Add any additional headers here
          },
        });

        // Step 4: Handle the response of the second request
        
         

          // Step 5: Store in portfolio (assuming you want to store it in state)
          setPortfolio(secondResponse.data);
          setRows(secondResponse.data.equities);
          setCurrentCagr(secondResponse.data.current_return)
          setOptimisedCagr(secondResponse.data.optimised_return)
        

      } catch (error) {
        console.error("Error fetching data:", error.message);
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
       optimized_portfolio={portfolio.is_optimised?portfolio:undefined}
       />
    </div>
  );
}

export default DisplayPortfolio;
