import React from "react";
import sprite from "../images/sprite.svg"

function PriceTable({
  tableHead = ["Time", "DIN", "DIN/ETH"],
  tableData = [
    ["12:19:59:pm May 2", 100.5, 0.5],
    ["12:19:59:pm May 2", 100.5, 0.6],
    ["12:19:59:pm May 2", 100.5, 0.3],
    ["12:19:59:pm May 2", 100.5, 0.2],
    ["12:19:59:pm May 2", 100.5, 0.1],
  ],
}) {
  return (
    <div className="price-table">
    <table>
      <thead>
        <tr>
          {tableHead.map((head) => (
            <th key={head.toString()}>
              <span className="price-talbel__head icon-label">
                {head}
              </span>
              <svg className="icon icon--small">
                <use xlinkHref={sprite + "#sort"}></use>
              </svg>
            </th>
          ))}
        </tr>
      </thead>
        <tbody>
        {tableData.map((data) => (
          <tr key={data.toString()}>
            <td>{data[0]}</td>
            <td>{data[1]}</td>
            <td>{data[2]}</td>
          </tr>
        ))}
      </tbody>
    </table></div>
  );
}

export default PriceTable;
