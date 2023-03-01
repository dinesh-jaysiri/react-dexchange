import React from "react";
import BlockHeader from "./BlockHeader";
import { getProvider } from "../store/provider";
import { getExchange, fillOrder } from "../store/exchange";
import { getSymbols } from "../store/tokens";
import { orderBookSelector } from "../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../images/sprite.svg"
import Banner from "./Banner";

function OrderBook() {
  const provider = useSelector(getProvider);
  const exchange = useSelector(getExchange);
  const symbols = useSelector(getSymbols);
  const orderBook = useSelector(orderBookSelector);
  const dispatch = useDispatch();

  const fillOrderHandler = (order) => {
    fillOrder(provider, exchange, order, dispatch);
  };

  return (
    <div className="order-book block">
      <BlockHeader heading="Order Book" toggleBtn={false} />
      <div className="table-continer">
        <div className="table-wrap">
          <label className="label">Sell</label>
          {!orderBook || orderBook.sellOrders.length === 0 ? (
            <Banner text="No Sell Orders" />
          ) : (
            <div className="price-table">
              <table rules="none">
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
                      <span className="price-talbel__head icon-label">
                        {symbols && symbols[1]}
                      </span>
                      <svg className="icon icon--small">
                        <use xlinkHref={sprite + "#sort"}></use>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderBook &&
                    orderBook.sellOrders.map((order, index) => (
                      <tr
                        key={index.toString()}
                        onClick={() => fillOrderHandler(order)}
                      >
                        <td>{order.token0Amount}</td>
                        <td style={{ color: `${order.orderTypeClass}` }}>
                          {order.tokenPrice}
                        </td>
                        <td>{order.token1Amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="table-wrap">
          <label className="label">Buy</label>
          {!orderBook || orderBook.buyOrders.length === 0 ? (
            <Banner text="No Buy Orders" />
          ) : (
            <div className="price-table">
              <table rules="none" >
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
                      <span className="price-talbel__head icon-label">
                        {symbols && symbols[1]}
                      </span>
                      <svg className="icon icon--small">
                        <use xlinkHref={sprite + "#sort"}></use>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderBook &&
                    orderBook.buyOrders.map((order, index) => (
                      <tr
                        key={index.toString()}
                        onClick={() => fillOrderHandler(order)}
                      >
                        <td>{order.token0Amount}</td>
                        <td style={{ color: `${order.orderTypeClass}` }}>
                          {order.tokenPrice}
                        </td>
                        <td>{order.token1Amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderBook;
