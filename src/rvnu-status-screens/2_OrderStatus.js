import React from "react";
import FormWrapper from "../rvnu-components/FormWrapper";
import styled from "styled-components";
import FormButton from "../rvnu-components/Button";

export default function OrderSuccess({ paymentStatus }) {
  //Reset demo
  const reset = async () => {
    window.open("https://rvnu-demo.app", "_self");
  };

  return (
    <FormWrapper>
      <BodyWrapper>
        <MockMerchantWrap>
          <SaleTextHeader>{`Order ${paymentStatus}`}</SaleTextHeader>
        </MockMerchantWrap>
        <Text>
          Thanks for testing the RVNU payment experience. Please reach out to
          Chris or Jack and share your feedback.
        </Text>
        <FormButton
          buttonText={"Reset Demo"}
          onClick={() => reset()}
        ></FormButton>
      </BodyWrapper>
    </FormWrapper>
  );
}

// Styled components
const SaleTextHeader = styled.p`
  margin: 20px 0 10px 0;
  font-family: "Space Mono";
  font-size: 16px;
`;

const Text = styled.p`
  color: black;
  font-size: 14px;
  margin: 20px 0px 30px 0px;
`;

const MockMerchantWrap = styled.div`
  margin: 0px 0px 10px 0px;
`;

const BodyWrapper = styled.p`
  display: flex;
  flex-direction: column;
`;
