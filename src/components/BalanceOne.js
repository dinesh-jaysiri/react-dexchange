import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BalanceData from './BalanceData'
import BalanceForm from './BalanceForm'
import BlockHeader from './BlockHeader'
import {changeBlanceState, getisDeposit} from "../store/ui"

function BalanceOne() {
  const dispatch = useDispatch()
  const isDeposit = useSelector(getisDeposit)
  return (
    <div className=" block balance-one">
      <BlockHeader
        heading="Balance"
        toggleBtn
        button1="Deposit"
        button2="Withdraw"
        toggle={isDeposit}
        setToggle={() => changeBlanceState(dispatch)}
      />
      <BalanceData istoken_1={true} />
      <BalanceForm istoken_1={true} />
      <div className="separator"></div>
    </div>
  );
}

export default BalanceOne