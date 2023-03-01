import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccount,
  getChainId,
  getEtherBalance,
  getProvider,
  loadAccount,
} from "../store/provider";
import truncateEthAddress from "truncate-eth-address";

function ConnectWallet() {
  const etherBalance = useSelector(getEtherBalance);
  const provider = useSelector(getProvider);
  const account = useSelector(getAccount);

  const dispatch = useDispatch();
  const loadConnectedAccounts = async () => {
    console.log("loadWallet")
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length > 0) await loadAccount(provider, dispatch);
  };

  useEffect(() => {
    loadConnectedAccounts();
  });

  const connectHandler = async () => {
    await loadAccount(provider, dispatch);
  };
  return (
    <div className="connect-wallet">
      <div className="connect-wallet__balance">
        <div className="label label--small">Ballance</div>
        <div className="label">
          {etherBalance ? Number(etherBalance).toFixed(4) : "0 ETH"}
        </div>
      </div>
      <button onClick={connectHandler} className="btn-connect">
        {account ? truncateEthAddress(account) : "Connect"}
      </button>
    </div>
  );
}

export default ConnectWallet;
