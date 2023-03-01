import React from "react";
import BalanceData from "./BalanceData";
import BalanceForm from "./BalanceForm";

function BalanceTwo() {
  return (
    <div className="block balance-two">
      <BalanceData istoken_1={false} />
      <BalanceForm istoken_1={false} />
      <div className="separator"></div>
    </div>
  );
}

export default BalanceTwo;
