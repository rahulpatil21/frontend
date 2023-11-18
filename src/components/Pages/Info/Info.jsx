import { DisplayStock } from "../../StockTable/DisplayStock";
import { useState } from "react";
function Info() {
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
  return (
    <div className="main-content-holder">
      <div className="content-grid-one ">
        <DisplayStock rows={rows} header={"Old Portpolio"} />
        <br />
      </div>
    </div>
  );
}
export default Info;
