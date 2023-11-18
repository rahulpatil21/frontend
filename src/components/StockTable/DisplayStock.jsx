import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./StockTable.css";

export const DisplayStock = ({ rows, header }) => {
  return (
    <div className="stock-table">
      <h1 className="table-header">{header}</h1>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="expand">Stock Name</th>
              <th>Avg. Price</th>
              <th>Qty</th>
              <th>Current Price</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              return (
                <tr key={idx} className="table-body">
                  <td className="expand">{row.stock}</td>
                  <td>{row.avg_price}</td>
                  <td>{row.qty}</td>
                  <td>{row.current_price}</td>
                  <td
                    className={
                      row.current_price > row.avg_price
                        ? "profit-text"
                        : "loss-text"
                    }
                  >
                    {(row.current_price - row.avg_price) * row.qty}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
