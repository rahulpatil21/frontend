import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";
import { InvestmentTable } from "../StockTable/InvestmentTable";
import { PortfolioTable } from "../StockTable/PortfolioTable";
import {AddInvestment} from "../AddStock/AddInvestment";
import axios from "axios";
import { EditFire } from "../AddStock/EditFire";
import { useReload, } from "../../state/ReloadContext";
import Piechart from "../Diagram/PieChart";
import ComparePieChart from "../Diagram/ComparePieChart";
import { BsFillPencilFill } from "react-icons/bs";
import calculateMonthlySIP from "../../helpers/sip"; 
import calculateDuration from "../../helpers/duration";
function DisplayFire() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [portfolio, setPortfolio]=useState({})
  const [optimizedPortfolio, setOptimizedPortfolio]=useState()
  const [fire, setFire] = useState()
  const [reqBody, setReqBody] = useState()
  const [reloadCurrent, setreloadCurrent] = useState(false)
  const { reloadFlag,setCurrentCagr,currentCagr,optimisedCagr ,setOptimisedCagr} = useReload();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Make the first request
        const fire_data = await axios.get("http://127.0.0.1:8000/wealthwish/FIRE/", {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });

        // Step 4: Handle the response of the second request
        
         
        setFire(fire_data.data)
       console.log(fire_data.data)
        setReqBody({"todays_yearly_requirement":parseFloat(fire_data.data.todays_yearly_requirement),
                    "duration":fire_data.data.duration})
       
          // Step 5: Store in portfolio (assuming you want to store it in state)
        //   setPortfolio();
        //   setRows();
        

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag,reloadCurrent]); // Empty dependency array ensures this effect runs only once when the component mounts
  const handleSubmit = async (newRow) => {
    console.log("handleSubmit",newRow)
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/wealthwish/FIRE/',
        newRow,
        {
          headers: {
            Authorization: `Bearer Token ${token}`,
            'Content-Type': 'application/json', // Adjust the content type as needed
          },
        }
      );
      console.log("handleSubmit",response.data)
    } catch (error) {
      console.error('Error making post request:', error.message);
    }
    setreloadCurrent(prevValue => !prevValue);

  }
  return (
    <div>
        <div className="grid-c-title">
        <h3 className="grid-c-title-text">Edit Retire Plan</h3>
        <span className="actions">
                    <BsFillPencilFill
                    onClick={ () => setEditModalOpen(true)}
                    />

                  </span>
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">My Yearly Expenses</h2>
        {fire?<span className="lg-value">$ {fire.todays_yearly_requirement}</span>:<></>}
      </div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">I Want To Retire In</h2>
        {fire?<span className="lg-value">{fire.duration} Years</span> :<></>}
      </div>
      <br/>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Your FIRE Amount</h2>
        {fire?<span className="lg-value">$ {fire.FIRE_amount}</span>:<></>}
      </div>
      <br/>
      {fire?<div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">We Will Suggest You To Invest {calculateMonthlySIP(fire.FIRE_amount,currentCagr,fire.duration)}$ monthly in your current portfolio which has cagr of {(currentCagr*100).toFixed(2)}% to achieve goal of {fire.FIRE_amount} $ in {fire.duration} years</h2>
        </div>:<></>}
        <br/>
      {fire?<div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">But if you optimize your portfolio You only need to Invest {calculateMonthlySIP(fire.FIRE_amount,optimisedCagr,fire.duration)}$ monthly in your optimised portfolio which has cagr of {(optimisedCagr*100).toFixed(2)}% to achieve goal of {fire.FIRE_amount} $ in {fire.duration} years</h2>
      </div>:<></>}
      <br/>
      {fire?<div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Or with your optimised portfolio You can Invest {calculateMonthlySIP(fire.FIRE_amount,currentCagr,fire.duration)}$ monthly in your optimised portfolio which has cagr of {(optimisedCagr*100).toFixed(2)}% to achieve goal of {fire.FIRE_amount} $ in {calculateDuration(fire.FIRE_amount,optimisedCagr,calculateMonthlySIP(fire.FIRE_amount,currentCagr,fire.duration))} years</h2>
      </div>:<></>}
      <br/>
      {/* <PortfolioTable rows={rows}/> */}
      {/* <ComparePieChart  
      portfolio={portfolio}
       optimized_portfolio={portfolio.is_optimised?portfolio:undefined}
       /> */}

{editModalOpen && (
        <EditFire
          
          closeModal={() => {
            setEditModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={reqBody}
        />
       )} 
    </div>
  );
}

export default DisplayFire;
