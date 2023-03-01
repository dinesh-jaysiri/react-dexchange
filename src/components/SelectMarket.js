import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NETWORK_MAPPING } from "../constants";
import { getChainId, getProvider } from "../store/provider";
import { loadTokens } from "../store/tokens";
import BlockHeader from "./BlockHeader";

function SelectMarket() {
  const provider = useSelector(getProvider);
  const chainId = useSelector(getChainId);
  const dispatch = useDispatch();

  const marketHandler = async (e) => {
    loadTokens(provider, e.target.value.split(","), dispatch);
  };

  return (
    <div className="select-market block">
      {!(chainId && NETWORK_MAPPING[chainId]) ? (
        <BlockHeader heading="Not Deployed to Network" toggleBtn={false} />
      ) : (
        <>
          <BlockHeader heading="Select Market" toggleBtn={false} />
          <form>
            <select onChange={marketHandler} className="input">
              <option
                value={`${NETWORK_MAPPING[chainId].DEX[0]},${NETWORK_MAPPING[chainId].mETH[0]}`}
              >
                DEX / mETH
              </option>
              <option
                value={`${NETWORK_MAPPING[chainId].DEX[0]},${NETWORK_MAPPING[chainId].mDAI[0]}`}
              >
                DEX / mDAI
              </option>
            </select>
          </form>
          <div className="separator"></div>
        </>
      )}
    </div>
  );
}

export default SelectMarket;
