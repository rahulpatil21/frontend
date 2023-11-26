import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";
import { InvestmentTable } from "../StockTable/InvestmentTable";
import { EditStock } from "../EditStock/EditStock";
import { AddGoal } from "../AddStock/AddGoal";
import {AddInvestment} from "../AddStock/AddInvestment";
import axios from "axios";
import Autocomplete from "../Autocomplete/AutoComplete";
import { useReload } from "../../context/ReloadContext";
import { GoalTable } from "../StockTable/GoalTable";
import { EditGoal } from "../EditStock/EditGoal";
function DisplayGoal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [stockList, setStockList]=useState([])
  const [goals, setGoals]=useState([])
  const [refreshSignal, setRefreshSignal] = useState(false);
  const [defaultEdit, setDefaultEdit] = useState({});
  const { handleReload } = useReload();
  const { reloadFlag } = useReload();
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        let goals = await axios.get("http://127.0.0.1:8000/wealthwish/goals", {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });


        goals=goals.data
        
        setGoals(goals)
        
      } catch (error) {
        console.error("Error fetching stock data:", error.message);
      }
    };

    fetchData();
  }, [reloadFlag,refreshSignal]); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleDeleteRow = async (targetIndex) => {
    try {
      // Make the DELETE request with the token in the Authorization header
      // and include the ID in a custom 'id' header
      await axios.delete(`http://127.0.0.1:8000/wealthwish/goals/`, {
        headers: {
          Authorization: `Bearer Token ${token}`,
          name: targetIndex.name,
        },
      });
      
      setRefreshSignal(x=>!x)
      // Update the state to remove the deleted row
      setRows(rows.filter((row) => row.id !== targetIndex.id));
    } catch (error) {
      console.error("Error deleting investment:", error.message);
    }
  };

  const handleEditRow = async (targetIndex) => {
    setDefaultEdit(targetIndex)
    setModalOpen(true)
   
    // try {
    //   // Make the DELETE request with the token in the Authorization header
    //   // and include the ID in a custom 'id' header
    //   await axios.delete(`http://127.0.0.1:8000/wealthwish/goals/`, {
    //     headers: {
    //       Authorization: `Bearer Token ${token}`,
    //       name: targetIndex.name,
    //     },
    //   });
      
    //   setRefreshSignal(x=>!x)
    //   // Update the state to remove the deleted row
    //   setRows(rows.filter((row) => row.id !== targetIndex.id));
    // } catch (error) {
    //   console.error("Error deleting investment:", error.message);
    // }
  };
 const ActivateGoal=async (newRow) => {
    try {
        let payload={
            "name":newRow.name,
            "is_active":newRow.is_active,
          }
       
    const response = await axios.put(
      'http://127.0.0.1:8000/wealthwish/activate_goals/',
      payload,
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      }
    );
    setRefreshSignal(x=>!x)
  } catch (error) {
    console.error('Error making post request:', error.message);
  }
 }
  const handleSubmit = async (newRow) => {
  try {
       
    const response = await axios.post(
      'http://127.0.0.1:8000/wealthwish/goals/',
      newRow,
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      }
    );
    setRefreshSignal(x=>!x)
  } catch (error) {
    console.error('Error making post request:', error.message);
  }
};
  
  return (
    <div>
      {/* <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Total Investment</h2>
        <span className="lg-value">$ 100,000</span>
      </div> */}
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Add New goal</h3>
        <button
          className="grid-c-title-icon"
          onClick={() => setEditModalOpen(true)}
        >
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <GoalTable
        rows={goals}
        deleteRow={handleDeleteRow}
        editRow={handleEditRow}
      />
      {modalOpen && (
        <EditGoal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onToggle={ActivateGoal}
          defaultValue={defaultEdit}
        />
      )}
      {editModalOpen && (
        <AddGoal
          goalList={goals}
          closeModal={() => {
            setEditModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
       )} 
    </div>
  );
}

export default DisplayGoal;
