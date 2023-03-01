import React from "react";
import { useSelector } from "react-redux";
import { filledOrdersSelector } from "../store/selectors";
import BlockHeader from "./BlockHeader";
import { getSymbols } from "../store/tokens";
import Banner from "./Banner";
import sprite from "../images/sprite.svg"

function Trades() {
  const symbols = useSelector(getSymbols);
  const filledOrders = useSelector(filledOrdersSelector);
  return (
    <div className="trades block">
      <BlockHeader heading="Trades" toggleBtn={false} />
      {!filledOrders || filledOrders.length === 0 ? (
        <Banner text="No Transactions" />
      ) : (
        <div className="price-table">
          <table>
            <thead>
              <tr>
                <th>
                  <span className="price-talbel__head icon-label">Time</span>
                  <svg className="icon icon--small">
                    <use xlinkHref={sprite + "#sort"}></use>
                  </svg>
                </th>
                <th>
                  <span className="price-talbel__head icon-label">
                    {symbols && symbols[0]}
                  </span>
                  <svg className="icon icon--small">
                    <use xlinkHref={sprite + "#sort"}></use>
                  </svg>
                </th>
                <th>
                  <span className="price-talbel__head icon-label">
                    {symbols && symbols[0]}/{symbols && symbols[1]}
                  </span>
                  <svg className="icon icon--small">
                    <use xlinkHref={sprite + "#sort"}></use>
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              {filledOrders &&
                filledOrders.map((order, index) => (
                  <tr key={index.toString()}>
                    <td>{order.formattedTimestamp}</td>
                    <td style={{ color: `${order.tokenPriceClass}` }}>
                      {order.token0Amount}
                    </td>
                    <td>{order.tokenPrice}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="separator"></div>
    </div>
  );
}

export default Trades;
