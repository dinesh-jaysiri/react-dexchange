import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "ui",
  initialState: {
    isBuy:true,
    isDeposit:true,
    isMyOrders:true
  },
  reducers: {
    toggleOrderState: (state, action) => {
      state.isBuy = !state.isBuy
    },
    togglebalanceState: (state, action) => {
      state.isDeposit = !state.isDeposit;
    },
    toggleMyOrdersState:(state,action)=>{
      state.isMyOrders = !state.isMyOrders
    }
  },
});

const {
  toggleOrderState,
  togglebalanceState,
  toggleMyOrdersState
} = slice.actions;

export default slice.reducer;

export const changeNewOrderState = async (dispatch) => {
  dispatch(toggleOrderState())
  return null
};

export const changeBlanceState = async (dispatch) =>{
    dispatch(togglebalanceState()) 
    return null
}

export const cahngeMyOrderState = async(dispatch)=>{
  dispatch(toggleMyOrdersState())
}

export const getisBuy= createSelector(
    state => state.ui.isBuy,
    isBuy => isBuy
)

export const getisDeposit = createSelector(
  (state) => state.ui.isDeposit,
  (isDeposit) => isDeposit
);
export const getsiMyOrder = createSelector(
  (state)=> state.ui.isMyOrders,
  myOrders => myOrders
)