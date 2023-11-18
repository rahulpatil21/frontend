import "./CurrentPortfolio.css";
import { iconsImgs } from "../../utils/images";
import DisplayAndEditStock from "../DisplayAndEditStock/DisplayAndEditStock";
import { useState } from "react";
import { AddStock } from "../AddStock/AddStock";

const CurrentPortfolio = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      stock: "Tata",
      avg_price: 20,
      qty: 10,
      current_price: 25,
    },
    {
      stock: "Tata",
      avg_price: 20,
      qty: 10,
      current_price: 25,
    },
    {
      stock: "TCS",
      avg_price: 30,
      qty: 10,
      current_price: 25,
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Current Investment</h3>
      </div>

      <DisplayAndEditStock />
    </div>
  );
};

export default CurrentPortfolio;
