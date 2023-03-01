import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getisBuy } from "../store/ui";
import { getProvider } from "../store/provider";
import { getTokens } from "../store/tokens";
import { getExchange, makeBuyOrder, makeSellOrder } from "../store/exchange";

const ordersSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0)
    .required("Required")
    .nullable(false)
    .max(1000000000),
  price: Yup.number()
    .min(0)
    .required("Required")
    .nullable(false)
    .max(1000000000),
});

function NewOrderForm() {
  const provider = useSelector(getProvider);
  const tokens = useSelector(getTokens);
  const exchange = useSelector(getExchange);

  const dispatch = useDispatch();
  const isBuy = useSelector(getisBuy);
  const buyHandler = ({ amount, price }) => {
    makeBuyOrder(provider, exchange, tokens, { amount, price }, dispatch);
  };

  const sellHandler = ({ amount, price }) => {
    makeSellOrder(provider, exchange, tokens, { amount, price }, dispatch);
  };
  return (
    <Formik
      initialValues={{
        amount: "",
        price: "",
      }}
      validationSchema={ordersSchema}
      onSubmit={(e, { resetForm }) => {
        if (isBuy) {
          buyHandler(e);
        } else sellHandler(e);
        resetForm();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <label className="label">{`${isBuy ? "Buy" : "Sell"} Amount`}</label>
          <Field
            className={
              errors.amount && touched.amount ? "input input--error" : "input"
            }
            name="amount"
            placeholder="0.0000"
            autoComplete="off"
          />

          <label className="label">{`${isBuy ? "Buy" : "Sell"} Price`}</label>
          <Field
            className={
              errors.price && touched.price ? "input input--error" : "input"
            }
            name="price"
            placeholder="0.0000"
            autoComplete="off"
          />
          <button
            disabled={isSubmitting}
            className="btn btn--primary"
            type="submit"
          >
            {isBuy ? "Buy Order" : "Sell Order"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewOrderForm;
