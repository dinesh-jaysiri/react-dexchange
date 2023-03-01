import React from "react";
import BlockHeader from "./BlockHeader";
import sprite from "../images/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { cahngeMyOrderState, getsiMyOrder } from "../store/ui";
import { getSymbols } from "../store/tokens";
import Banner from "./Banner";
import {
  myFilledOrdersSelector,
  myOpenOrdersSelector,
} from "../store/selectors";
import { getProvider } from "../store/provider";
import { getExchange, cancelOrder } from "../store/exchange";

function MyOrders() {
  const isMyOrders = useSelector(getsiMyOrder);
  const dispatch = useDispatch();
  const symbols = useSelector(getSymbols);
  const myOpenOrders = useSelector(myOpenOrdersSelector);
  const myFilledOrders = useSelector(myFilledOrdersSelector);
  const provider = useSelector(getProvider);
  const exchange = useSelector(getExchange);

  const cancelHandler = (order) => {
    cancelOrder(provider, exchange, order, dispatch);
  };

  return (
    <div className="my-orders block">
      <BlockHeader
        setToggle={() => cahngeMyOrderState(dispatch)}
        toggle={isMyOrders}
        toggleBtn="true"
        button1="Orders"
        button2="Trades"
        heading={isMyOrders ? "My Orders" : "My Transactions"}
      />

      {isMyOrders ? (
        !myOpenOrders || myOpenOrders.length === 0 ? (
          <Banner text="No Open Orders" />
        ) : (
          <div className="price-table">
            <table>
              <thead>
                <tr>
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
                  <th>
                    <span className="price-talbel__head icon-label">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOpenOrders &&
                  myOpenOrders.map((order, index) => (
                    <tr key={index.toString()}>
                      <td style={{ color: `${order.orderTypeClass}` }}>
                        {order.token0Amount}
                      </td>
                      <td>{order.tokenPrice}</td>
                      <td>
                        <button
                          className="btn--cancel btn--outline"
                          onClick={() => cancelHandler(order)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )
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
              {myFilledOrders &&
                myFilledOrders.map((order, index) => (
                  <tr key={index.toString()}>
                    <td>{order.formattedTimestamp}</td>
                    <td style={{ color: `${order.orderClass}` }}>
                      {order.orderSign}
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

export default MyOrders;

