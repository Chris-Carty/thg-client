import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormWrapper from "../rvnu-components/FormWrapper";
import TextFieldUser from "../rvnu-components/text/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import ButtonRvnuPay from "../rvnu-components/ButtonRvnuPay";
import api from "../utils/api";
import PayByBankInfo from "../rvnu-components/text/PayByBankInfo";

export default function Form() {
  // CONFIG
  const clientId = "94ff854c-5015-4f15-9ff5-43106b4d0b7a";
  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Error Button Styling
  const [errorName, setErrorName] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  // Required From Fields
  const [paymentAmount, setPaymentAmount] = useState(1.0);
  const [payerName, setPayerName] = useState("");

  useEffect(() => {
    // Remove error text
    setErrorAmount(false);
    setErrorName(false);
  }, [payerName, paymentAmount]);

  const delayLoad = () => {
    setLoading(true);
    setTimeout(verifyForm, 800);
  };

  const verifyForm = () => {
    if (paymentAmount >= 1.0 && payerName.length > 0) {
      initiatePayment();
    } else if (paymentAmount < 1.0 && payerName.length > 0) {
      setErrorAmount(true);
      setLoading(false);
    } else if (paymentAmount < 1.0 && payerName.length === 0) {
      setErrorAmount(true);
      setErrorName(true);
      setLoading(false);
    } else if (paymentAmount >= 1.0 && payerName.length === 0) {
      setErrorName(true);
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    setLoading(true);

    const currency = "GBP";
    const reference = "UAT Test 123";

    try {
      api
        .post(
          `/payments/requests/${clientId}/${payerName}/${currency}/${paymentAmount}/${reference}`,
          {
            clientId,
            payerName,
            currency,
            paymentAmount,
            reference,
          }
        )
        .then(async (response) => {
          const paymentRequestId = response.data.paymentRequestId;
          // Use PaymentRequestId to generate RVNU payment URL.
          const rvnuPaymentLink = `https://rvnu.app/pay?client_id=${clientId}&payment_request_id=${paymentRequestId}`;
          // Redirect the user to this payment URL.
          window.open(rvnuPaymentLink, "_self");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch {
      setLoading(false);
      console.log("Error updating session mobile number");
    }
  };

  const realPayment = <BoldText>real payment</BoldText>;

  return (
    <FormWrapper>
      <Text>
        Welcome to the RVNU user acceptance testing space. You will make a{" "}
        {realPayment} using your online banking app.
      </Text>
      <PayByBankInfo />
      <TextFieldWrap>
        <TextFieldGrow>
          <TextFieldUser
            id="firstName"
            label="Your full name"
            placeholder="Jane Doe"
            autoComplete="given-name"
            InputLabelProps={{
              shrink: true,
            }}
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            error={errorName}
          />
        </TextFieldGrow>

        <TextFieldShrink>
          <TextFieldUser
            type="number"
            label="Amount (£1.00 min)"
            placeholder="1.00"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            error={errorAmount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyPoundIcon sx={{ height: 18 }} />
                </InputAdornment>
              ),
            }}
          />
        </TextFieldShrink>
      </TextFieldWrap>

      <ButtonRvnuPay
        loading={loading}
        onClick={() => delayLoad()}
      ></ButtonRvnuPay>
    </FormWrapper>
  );
}

// Styled comononets
const Text = styled.p`
  margin: 10px 0px;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;

const BoldText = styled.a`
  font-weight: 700;
  color: #6c71ff;
`;

const TextFieldWrap = styled.section`
  display: flex;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const TextFieldGrow = styled.section`
  flex-grow: 1;
`;

const TextFieldShrink = styled.section`
  width: 150px;
  margin-left: 10px;

  @media (max-width: 400px) {
    margin-left: 0px;
    width: 100%;
  }
`;
