import React from "react";
import { useSelector } from "react-redux";
import { NETWORK_MAPPING } from "../constants";
import sprite from "../images/sprite.svg";
import { getChainId } from "../store/provider";

function SelectNetwork() {
  const chainId = useSelector(getChainId);

  const networkHandler = async (e) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: e.target.value,
        },
      ],
    });
  };

  return (
    <div className="select-network ">
      <div>
        <svg className="icon">
          <use xlinkHref={sprite + "#ethereum"}></use>
        </svg>
      </div>

      <select
        className="input"
        value={
          NETWORK_MAPPING[chainId]
            ? chainId == "5"
              ? "0x5"
              : `0x${chainId.toString(16)}`
            : `0`
        }
        onChange={networkHandler}
      >
        <option disabled value={"0"}>
          Select Network
        </option>
        <option value={"0x5"}>Goerli</option>
        <option value={"0x7a69"}>Localhost</option>
      </select>
    </div>
  );
}

export default SelectNetwork;
