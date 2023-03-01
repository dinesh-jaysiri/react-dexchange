import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getisDeposit } from "../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { getTokens } from "../store/tokens";
import { getExchange, transferTokens } from "../store/exchange";
import { getProvider } from "../store/provider";

const balanceSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0)
    .required("Required")
    .nullable(false)
    .max(1000000000),
});

function BalanceForm({ istoken_1 = true }) {
  const isDeposit = useSelector(getisDeposit);
  const dispatch = useDispatch();
  const tokens = useSelector(getTokens);
  const provider = useSelector(getProvider);
  const exchange = useSelector(getExchange);

  const transactionHandler = (values) => {
    console.log(values);
    const token = istoken_1 ? tokens[0] : tokens[1];
    const type = isDeposit ? "Deposit" : "Withdraw";
    transferTokens(provider, exchange, type, token, values.amount, dispatch);
  };

  return (
    <Formik
      initialValues={{
        amount: "",
      }}
      validationSchema={balanceSchema}
      onSubmit={(values, { resetForm }) => {
        transactionHandler(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label className="label">Amount</label>
          <Field
            className={
              errors.amount && touched.amount ? "input input--error" : "input"
            }
            name="amount"
            placeholder="0.0000"
            autoComplete="off"
          />
          <button className="btn btn--outline" type="submit">
            {isDeposit ? "Deposit" : "Withdraw"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default BalanceForm;
