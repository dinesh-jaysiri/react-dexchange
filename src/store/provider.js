import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { ethers } from "ethers";

const slice = createSlice({
  name: "provider",
  initialState: {},
  reducers: {
    providerLoaded: (state, action) => {
      state.connection = action.payload;
    },
    // chaindId misspeld
    networkLoaded: (state, action) => {
      state.cahinId = action.payload;
    },
    accountLoaded: (state, action) => {
      state.account = action.payload;
    },
    etherBalanceLoaded: (state, action) => {
      state.etherBalance = action.payload;
    },
  },
});

const { providerLoaded, networkLoaded, accountLoaded, etherBalanceLoaded } =
  slice.actions;

export default slice.reducer;

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch(providerLoaded(connection));
  return connection;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch(networkLoaded(chainId));
  return chainId;
};

export const loadAccount = async (provider, dispatch) => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);

    dispatch(accountLoaded(account));

    let balance = await provider.getBalance(account);
    balance = ethers.utils.formatEther(balance);

    dispatch(etherBalanceLoaded(balance));
    return account;
  } catch (error) {
    return null;
  }
};

export const getEtherBalance = createSelector(
  (state) => state.provider.etherBalance,
  (etherBalance) => etherBalance
);

export const getChainId = createSelector(
  (state) => state.provider.cahinId,
  (cahinId) => cahinId
);

export const getAccount = createSelector(
  (state) => state.provider.account,
  (account) => account
);

export const getProvider = createSelector(
  (state) => state.provider.connection,
  (provider) => provider
);
