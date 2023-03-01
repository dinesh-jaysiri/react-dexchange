import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNewOrderState, getisBuy } from "../store/ui";
import BlockHeader from "./BlockHeader";
import NewOrderForm from "./NewOrderForm";

function NewOrders() {
  console.log("rendering");

  const dispatch = useDispatch();
  const isBuy = useSelector(getisBuy)


  return (
    <div className="block new-orders">
      <BlockHeader
        heading="New Orders"
        button1="Buy"
        button2="Sell"
        toggle={isBuy}
        setToggle={() => changeNewOrderState(dispatch)}
      />
      <NewOrderForm />
      <div className="separator"></div>
    </div>
  );
}

export default NewOrders;
