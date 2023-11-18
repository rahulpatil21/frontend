import { useState } from "react";
import { iconsImgs } from "../../utils/images";
import { StockTable } from "../StockTable/StockTable";
import { EditStock } from "../EditStock/EditStock";
import { AddStock } from "../AddStock/AddStock";
function DisplayAndEditStock() {
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

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
    <div>
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Total Investment</h2>
        <span className="lg-value">$ 100,000</span>
      </div>
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Add New Stock</h3>
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
        editRow={handleEditRow}
      />
      {modalOpen && (
        <EditStock
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
      {editModalOpen && (
        <AddStock
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
