import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormWrapper from "../rvnu-components/FormWrapper";
import TextFieldUser from "../rvnu-components/text/TextField";
import Dunk from "../rvnu-assets/dunk.jpg";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import ButtonRvnuPay from "../rvnu-components/ButtonRvnuPay";
import api from "../utils/api";

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
    const reference = `uat-test-${payerName}`;

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
      <MockMerchantWrap>
        <TextHeader>DEMO MERCHANT</TextHeader>
        <SaleTextHeader>Nike Dunk Low Michigan State</SaleTextHeader>
        <SaleTextHeader>Size: 10 Quantity: 1</SaleTextHeader>
        <MockMerchant>
          <SaleImgWrap>
            <img src={Dunk} alt="Nike Dunk Shoe" width="150" />
          </SaleImgWrap>
        </MockMerchant>
      </MockMerchantWrap>

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
const SaleImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 30px 0px;
`;

const MockMerchantWrap = styled.div`
  padding-top: 10px;
`;

const TextHeader = styled.p`
  margin: 0px 0 10px 0;
  font-family: "Space Mono";
  font-weight: 700;
  font-size: 16px;
`;

const SaleTextHeader = styled.p`
  margin: 25px 0px 10px 0px;
  font-family: "Space Mono";
  font-size: 16px;
`;

const MockMerchant = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  align-content: space-between;
`;

const Text = styled.p`
  color: grey;
  font-size: 14px;
  margin: 20px 0px;
`;

const BoldText = styled.a`
  font-weight: 700;
  color: black;
  font-size: 14px;
`;

const TextFieldWrap = styled.section`
  display: flex;
  margin-top: 10px;
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
