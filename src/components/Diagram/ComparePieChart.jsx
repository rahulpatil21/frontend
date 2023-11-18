import Piechart from "./PieChart";
import "../Diagram/PieChart.css";
function ComparePieChart({ header }) {
  return (
    <div>
      <h1 className="table-header">{header}</h1>
      <div className="compare-pie-container">
        <Piechart title={"Old Portpolio"} />
        <Piechart title={"Optimize Portpolio"} />
      </div>
    </div>
  );
}
export default ComparePieChart;
