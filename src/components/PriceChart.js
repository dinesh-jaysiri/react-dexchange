import React from "react";
import Chart from "react-apexcharts";
import { series as defaultSeries, options } from "./PriceChart.config";
import priceUp from "../images/price-up.png";
import priceDown from "../images/price-down.png";
import { useSelector } from "react-redux";
import { getAccount } from "../store/provider";
import { getSymbols } from "../store/tokens";
import { priceChartSelector } from "../store/selectors";
import Banner from "./Banner";

function PriceChart() {
  const account = useSelector(getAccount);
  const symbols = useSelector(getSymbols);
  const priceChart = useSelector(priceChartSelector);
  return (
    <div className="price-chart block">
      <div className="price-cahrt__header">
        <h2>{symbols && `${symbols[0]}/${symbols[1]}`}</h2>
        {priceChart && (
          <>
            <img
              className="price-change"
              src={priceChart.lastPriceChange === "+" ? priceUp : priceDown}
            />
            <label className="label">{priceChart.lastPrice}</label>
          </>
        )}
      </div>
      {!account ? (
        <Banner text="Please connect with Metamask" />
      ) : (
        <div className="price-chart__container">
          <Chart
            type="candlestick"
            options={options}
            series={ defaultSeries}
            width="100%"
            height="100%"
          />
        </div>
      )}

      <div className="separator"></div>
    </div>
  );
}

export default PriceChart;

//TODO: create better chart using documentation
