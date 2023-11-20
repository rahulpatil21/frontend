import { useState,useEffect } from "react";
import { iconsImgs } from "../../utils/images";
import { StockTable } from "../StockTable/StockTable";
import { EditStock } from "../EditStock/EditStock";
import {AddStock} from "../AddStock/AddStock";
import axios from "axios";
import Autocomplete from "../AutoComplete";

function DisplayAndEditStock() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [stockList, setStockList]=useState([])
  const [refreshSignal, setRefreshSignal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        let investment_history = await axios.get("http://127.0.0.1:8000/portfolio/investment/", {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });
        let equity_list = await axios.get("http://127.0.0.1:8000/portfolio/equities", {
          headers: {
            Authorization: `Bearer Token ${token}`,
          },
        });

        investment_history=investment_history.data
        equity_list=equity_list.data
        setStockList(equity_list)
        investment_history=investment_history.map(investment=>{
          investment.equity=equity_list.filter(equity=>equity.id===investment.equity)[0]
          return investment
        })
        setRows(investment_history)
      } catch (error) {
        console.error("Error fetching stock data:", error.message);
      }
    };

    fetchData();
  }, [refreshSignal]); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleDeleteRow = async (targetIndex) => {
    try {
      // Make the DELETE request with the token in the Authorization header
      // and include the ID in a custom 'id' header
      await axios.delete(`http://127.0.0.1:8000/portfolio/investment/`, {
        headers: {
          Authorization: `Bearer Token ${token}`,
          id: targetIndex.id,
        },
      });
  
      // Update the state to remove the deleted row
      setRows(rows.filter((row) => row.id !== targetIndex.id));
    } catch (error) {
      console.error("Error deleting investment:", error.message);
    }
  };

  const handleSubmit = async (newRow) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/portfolio/investment/',
      newRow,
      {
        headers: {
          Authorization: `Bearer Token ${token}`,
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      }
    );
    setRefreshSignal((prevSignal) => !prevSignal);
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
        <h3 className="grid-c-title-text">Add New Investment</h3>
        <button
          className="grid-c-title-icon"
          onClick={() => setEditModalOpen(true)}
        >
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <StockTable
        rows={rows}
        deleteRow={handleDeleteRow}
      />
      {/* {modalOpen && (
        <EditStock
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )} */}
      {editModalOpen && (
        <AddStock
          stockList={stockList}
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

export default DisplayAndEditStock;
