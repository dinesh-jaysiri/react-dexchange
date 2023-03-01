import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sprite from "../images/coin_sprite.svg";
import {
  getExchange,
  getExchangeBalances,
  getTransferInProgress,
  loadExchangeBalances,
} from "../store/exchange";
import { getAccount } from "../store/provider";
import {
  getSymbols,
  getTokenBalances,
  getTokens,
  loadTokenBalances,
} from "../store/tokens";
import { getisDeposit } from "../store/ui";

function BalanceData({ istoken_1 }) {
  const dispatch = useDispatch();

  const exchange = useSelector(getExchange);
  const account = useSelector(getAccount);
  const transferInProgress = useSelector(getTransferInProgress);

  const tokens = useSelector(getTokens);
  const symbols = useSelector(getSymbols);
  const tokenBalances = useSelector(getTokenBalances);
  const excahngeBalances = useSelector(getExchangeBalances);

  const isDeposit = useSelector(getisDeposit);

  useEffect(() => {
    if (exchange && tokens[0] && tokens[1] && account) {
      loadExchangeBalances(exchange,account,tokens, dispatch);
      loadTokenBalances(tokens, account, dispatch);
    }
  }, [exchange, tokens, account, transferInProgress, dispatch]);

  return (
    <div className="balance-data-continer">
      <div className="balance-data">
        <div className="label label--small">Token</div>
        <div className="balance-data__token">
          <svg className="icon">
            <use
              xlinkHref={sprite + `#${istoken_1 ? symbols[0] : symbols[1]}`}
            ></use>
          </svg>
          <div className="label icon-label">
            {symbols ? (istoken_1 ? symbols[0] : symbols[1]) : ""}
          </div>
        </div>
      </div>
      <div className="balance-data">
        <div className="label label--small">Wallet</div>
        <div className="label">
          {tokenBalances
            ? istoken_1
              ? Number(tokenBalances[0]).toFixed(4)
              : Number(tokenBalances[1]).toFixed(4)
            : "00.00"}
        </div>
      </div>
      <div className="balance-data">
        <div className="label label--small">Exchange</div>
        <div className="label">
          {excahngeBalances
            ? istoken_1
              ? Number(excahngeBalances[0]).toFixed(4)
              : Number(excahngeBalances[1]).toFixed(4)
            : "00.00"}
        </div>
      </div>
    </div>
  );
}

export default BalanceData;
