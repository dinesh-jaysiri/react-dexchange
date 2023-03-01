import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BrandLogo from "./BrandLogo";
import NewOrders from "./NewOrders";
import BalanceOne from "./BalanceOne";
import BalanceTwo from "./BalanceTwo";
import MyOrders from "./MyOrders";
import Trades from "./Trades";
import OrderBook from "./OrderBook";
import SelectMarket from "./SelectMarket";
import SelectNetwork from "./SelectNetwork";
import ConnectWallet from "./ConnectWallet";
import PriceChart from "./PriceChart";
import { loadAccount, loadNetwork, loadProvider } from "../store/provider";
import { EXCHANGE_ABI, NETWORK_MAPPING } from "../constants";
import {
  loadAllOrders,
  subscribeToEvents,
  loadExchange,
} from "../store/exchange";
import {loadTokens} from "../store/tokens"



function App() {
    const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Connect Ethers to blockchain
    const provider = loadProvider(dispatch)

    // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
    const chainId = await loadNetwork(provider, dispatch)

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    // Fetch current account & balance from Metamask when changed
    window.ethereum.on('accountsChanged', () => {
      loadAccount(provider, dispatch)
    })

    // Load token smart contracts
    
    const DEX = NETWORK_MAPPING[chainId].DEX[0]
    const mETH = NETWORK_MAPPING[chainId].mETH[0]
    await loadTokens(provider, [DEX, mETH], dispatch)

    // Load exchange smart contract
    const exchangeAddress = NETWORK_MAPPING[chainId].Exchange[0]
    const exchange = await loadExchange(provider, exchangeAddress,EXCHANGE_ABI, dispatch)

    // Fetch all orders: open, filled, cancelled
    loadAllOrders(provider, exchange, dispatch)

    // Listen to events
    subscribeToEvents(exchange, dispatch)
  }

  useEffect(()=>{
    loadBlockchainData()
  })
  return (
    <div className="app">
      <ConnectWallet />
      <SelectNetwork />
      <div className="top-continer">
        <BrandLogo />
        <SelectMarket />
        <PriceChart />
        <NewOrders />
      </div>

      <BalanceOne />
      <BalanceTwo />
      <MyOrders />
      <Trades />
      <OrderBook />
    </div>
  );
}

export default App;
