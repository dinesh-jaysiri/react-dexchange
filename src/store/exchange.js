import { createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "exchange",
  initialState: {
    loaded: false,
    contract: {},
    transaction: {
      isSuccessful: false,
    },
    allOrders: {
      loaded: false,
      data: [],
    },
    cancelledOrders: {
      data: [],
    },
    filledOrders: {
      data: [],
    },
    events: [],
  },
  reducers: {
    exchangeloaded: (state, action) => {
      state.loaded = true;
      state.contract = action.payload;
    },
    cancelledOrdersLoaded: (state, action) => {
      state.cancelledOrders = {
        loaded: true,
        data: action.payload,
      };
    },
    filledOrdersLoaded: (state, action) => {
      state.filledOrders = {
        loaded: true,
        data: action.payload,
      };
    },
    allOrdersLoaded: (state, action) => {
      state.allOrders = {
        loaded: true,
        data: action.payload,
      };
    },
    orderCancelRequest: (state, action) => {
      state.transaction = {
        transactionType: "Cancel",
        isPending: true,
        isSuccessful: false,
      };
    },
    orderCancelSuccess: (state, action) => {
      state.transaction = {
        transactionType: "Cancel",
        isPending: false,
        isSuccessful: true,
      };
      state.cancelledOrders.data.push(action.payload.order) ;
      state.events.unshift(action.payload.events);
    },
    orderCancelFail: (state, action) => {
      state.transaction = {
        transactionType: "Cancel",
        isPending: false,
        isSuccessful: false,
        isError: true,
      };
    },
    orderFillRequest: (state, action) => {
      state.transaction = {
        transactionType: "Fill Order",
        isPending: true,
        isSuccessful: false,
      };
    },
    orderFillSuccess: (state, action) => {
      let index = state.filledOrders.data.findIndex(
        (order) => order.id.toString() === action.payload.order.id.toString()
      );
      if (index === -1) {
        state.filledOrders.data.push(action.payload.order);
      }
      state.transaction = {
        transactionType: "Fill Order",
        isPending: false,
        isSuccessful: true,
      };
      state.events.unshift(action.payload.event);
    },
    orderFillFail: (state, action) => {
      state.transaction = {
        transactionType: "Fill Order",
        isPending: false,
        isSuccessful: false,
        isError: true,
      };
    },
    exchange_token_1_balance_loaded: (state, action) => {
      state.balances = [action.payload];
    },
    exchange_token_2_balance_loaded: (state, action) => {
      state.balances.push(action.payload);
    },
    transferRequest: (state, action) => {
      state.transaction = {
        transactionType: "Tranasfer",
        isPending: true,
        isSuccessful: false,
      };
      state.transferInProgress = true;
    },
    transferSuccess: (state, action) => {
      state.transaction = {
        transactionType: "Transfer",
        isPending: false,
        isSuccessful: true,
      };

      state.transferInProgress = false;
      state.events.unshift(action.payload);
    },
    transferFail: (state, action) => {
      state.transaction = {
        transactionType: "Transfer",
        isPending: false,
        isSuccessful: false,
        isError: true,
      };
      state.transferInProgress = false;
    },
    newOrderRequest: (state, action) => {
      state.transaction = {
        transactionType: "New Order",
        isPending: true,
        isSuccessful: false,
      };
    },
    newOrderSuccess: (state, action) => {
      let index = state.allOrders.data.findIndex(
        (order) => order.id.toString() === action.payload.order.id.toString()
      );
      if (index === -1) {
        state.allOrders.data.push(action.payload.order);
      }
      state.transaction = {
        transactionType: "New Order",
        isPending: false,
        isSuccessful: true,
      };
      state.events.unshift(action.payload.event);
    },
    newOrderFail: (state, action) => {
      state.transaction = {
        transactionType: "New Order",
        isPending: false,
        isSuccessful: false,
        isError: true,
      };
    },
  },
});

const {
  exchangeloaded,
  cancelledOrdersLoaded,
  filledOrdersLoaded,
  allOrdersLoaded,
  orderCancelRequest,
  orderCancelSuccess,
  orderCancelFail,
  orderFillRequest,
  orderFillSuccess,
  orderFillFail,
  exchange_token_1_balance_loaded,
  exchange_token_2_balance_loaded,
  transferRequest,
  transferSuccess,
  transferFail,
  newOrderRequest,
  newOrderSuccess,
  newOrderFail,
} = slice.actions;

export default slice.reducer;

export const loadExchange = async (
  provider,
  address,
  EXCHANGE_ABI,
  dispatch
) => {
  const exchange = new ethers.Contract(address, EXCHANGE_ABI, provider);
  dispatch(exchangeloaded(exchange));
  return exchange;
};

export const subscribeToEvents = (exchange, dispatch) => {
  exchange.on(
    "Cancel",
    (
      id,
      user,
      tokenGet,
      amountGet,
      tokenGive,
      amountGive,
      timestamp,
      event
    ) => {
      const order = event.args;
      dispatch(orderCancelSuccess({ order, event }));
    }
  );

  exchange.on(
    "Trade",
    (
      id,
      user,
      tokenGet,
      amountGet,
      tokenGive,
      amountGive,
      creator,
      timestamp,
      event
    ) => {
      const order = event.args;
      dispatch(orderFillSuccess({ order, event }));
    }
  );

  exchange.on("Deposit", (token, user, amount, balance, event) => {
    console.log("deposit event fire")
    dispatch(transferSuccess(event));
  });

  exchange.on("Withdraw", (token, user, amount, balance, event) => {
    dispatch(transferSuccess(event));
  });

  exchange.on(
    "Order",
    (
      id,
      user,
      tokenGet,
      amountGet,
      tokenGive,
      amountGive,
      timestamp,
      event
    ) => {
      const order = event.args;
      dispatch(newOrderSuccess({ order, event }));
    }
  );
};

// LOAD USER BALANCES (EXCHANGE BALANCES)

export const loadExchangeBalances = async (
  exchange,
  account,
  tokens,
  dispatch
) => {
  try {
    let balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[0].address, account),
    18
  );
  dispatch(exchange_token_1_balance_loaded(balance));

  balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[1].address, account),
    18
  );
  dispatch(exchange_token_2_balance_loaded(balance));
  } catch (error) {
    
  }
  
};

// LOAD ALL ORDERS

export const loadAllOrders = async (provider, exchange, dispatch) => {
  const block = await provider.getBlockNumber();

  // Fetch canceled orders
  const cancelStream = await exchange.queryFilter("Cancel", 0, block);
  const cancelledOrders = cancelStream.map((event) => event.args);

  dispatch(cancelledOrdersLoaded(cancelledOrders));

  // Fetch filled orders
  const tradeStream = await exchange.queryFilter("Trade", 0, block);
  const filledOrders = tradeStream.map((event) => event.args);
  dispatch(filledOrdersLoaded(filledOrders));

  // Fetch all orders
  const orderStream = await exchange.queryFilter("Order", 0, block);
  const allOrders = orderStream.map((event) => event.args);

  dispatch(allOrdersLoaded(allOrders));
};

// TRANSFER TOKENS (DEPOSIT & WITHDRAWS)

export const transferTokens = async (
  provider,
  exchange,
  transferType,
  token,
  amount,
  dispatch
) => {
  let transaction;

  dispatch(transferRequest());

  try {
    const signer = await provider.getSigner();
    const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);

    if (transferType === "Deposit") {
      transaction = await token
        .connect(signer)
        .approve(exchange.address, amountToTransfer);
      await transaction.wait();
      transaction = await exchange
        .connect(signer)
        .depositToken(token.address, amountToTransfer);
    } else {
      transaction = await exchange
        .connect(signer)
        .withdrawToken(token.address, amountToTransfer);
    }

    await transaction.wait();
  } catch (error) {
    dispatch(transferFail());
  }
};

// ORDERS (BUY & SELL)

export const makeBuyOrder = async (
  provider,
  exchange,
  tokens,
  order,
  dispatch
) => {
  const tokenGet = tokens[0].address;
  const amountGet = ethers.utils.parseUnits(order.amount, 18);
  const tokenGive = tokens[1].address;
  const amountGive = ethers.utils.parseUnits(
    (order.amount * order.price).toString(),
    18
  );

  dispatch(newOrderRequest());

  try {
    const signer = await provider.getSigner();
    const transaction = await exchange
      .connect(signer)
      .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
    await transaction.wait();
  } catch (error) {
    dispatch(newOrderFail());
  }
};

export const makeSellOrder = async (
  provider,
  exchange,
  tokens,
  order,
  dispatch
) => {
  const tokenGet = tokens[1].address;
  const amountGet = ethers.utils.parseUnits(
    (order.amount * order.price).toString(),
    18
  );
  const tokenGive = tokens[0].address;
  const amountGive = ethers.utils.parseUnits(order.amount, 18);

  dispatch(newOrderRequest());

  try {
    const signer = await provider.getSigner();
    const transaction = await exchange
      .connect(signer)
      .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
    await transaction.wait();
  } catch (error) {
    dispatch(newOrderFail());
  }
};

// // CANCEL ORDER

export const cancelOrder = async (provider, exchange, order, dispatch) => {
  dispatch(orderCancelRequest());

  try {
    const signer = await provider.getSigner();
    const transaction = await exchange.connect(signer).cancelOrder(order.id);
    await transaction.wait();
  } catch (error) {
    dispatch(orderCancelFail());
  }
};

// FILL ORDER

export const fillOrder = async (provider, exchange, order, dispatch) => {
  dispatch(orderFillRequest());

  try {
    const signer = await provider.getSigner();
    const transaction = await exchange.connect(signer).fillOrder(order.id);
    await transaction.wait();
  } catch (error) {
    dispatch(orderFillFail());
  }
};

export const getExchange = createSelector(
  (state) => state.exchange.contract,
  (contract) => contract
);

export const getExchangeBalances = createSelector(
  (state) => state.exchange.balances,
  (balances) => balances
);

export const getTransferInProgress = createSelector(
  (state) => state.exchange.transferInProgress,
  (transferInProgress) => transferInProgress
);

