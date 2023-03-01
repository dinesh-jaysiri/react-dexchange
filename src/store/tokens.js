import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { createSelector } from "reselect";
import { TOKEN_ABI } from "../constants";

const slice = createSlice({
  name: "tokens",
  initialState: {
    loaded: false,
    contracts: [],
    symbols: [],
  },
  reducers: {
    token_1_loaded: (state, action) => {
      state.loaded = true;
      state.contracts = [action.payload.token];
      state.symbols = [action.payload.symbol];
    },
    token_1_balanceLoaded: (state, action) => {
      state.balances = [action.payload];
    },
    token_2_loaded: (state, action) => {
      state.loaded = true;
      state.contracts.push(action.payload.token);
      state.symbols.push(action.payload.symbol);
    },
    token_2_balanceLoaded: (state, action) => {
      state.balances.push(action.payload);
    },
  },
});

const {
  token_1_loaded,
  token_2_loaded,
  token_1_balanceLoaded,
  token_2_balanceLoaded,
} = slice.actions;

export default slice.reducer;

export const loadTokens = async (provider, addresses, dispatch) => {
  let token, symbol;

  token = new ethers.Contract(addresses[0], TOKEN_ABI, provider);
  symbol = await token.symbol();
  dispatch(token_1_loaded({ token, symbol }));

  token = new ethers.Contract(addresses[1], TOKEN_ABI, provider);
  symbol = await token.symbol();
  dispatch(token_2_loaded({ token, symbol }));

  return token;
};

export const loadTokenBalances = async (
  tokens,
  account,
  dispatch
) => {
  let balance = ethers.utils.formatUnits(
    await tokens[0].balanceOf(account),
    18
  );
  dispatch(token_1_balanceLoaded(balance));

  balance = ethers.utils.formatUnits(await tokens[1].balanceOf(account), 18);
  dispatch(token_2_balanceLoaded(balance));
};

export const getTokens = createSelector(
  (state) => state.tokens.contracts,
  (contracts) => contracts
);

export const getSymbols = createSelector(
  (state) => state.tokens.symbols,
  (symbols) => symbols
);

export const getTokenBalances = createSelector(
  (state) => state.tokens.balances,
  (balances) => balances
);
