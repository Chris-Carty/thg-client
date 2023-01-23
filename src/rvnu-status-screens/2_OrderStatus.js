import React from "react";
import FormWrapper from "../rvnu-components/FormWrapper";
import styled from "styled-components";
import HelperText from "../rvnu-components/text/HelperText";
import FormButton from "../rvnu-components/Button";
import Dunk from "../rvnu-assets/dunk.jpg";

export default function OrderSuccess({ paymentStatus }) {
  //Reset demo
  const reset = async () => {
    window.open("https://rvnu-demo.app", "_self");
  };

  return (
    <FormWrapper>
      <Text>
        Thanks for testing the RVNU payment experience. Please reach out to
        Chris or Jack and share your feedback!
      </Text>
      <MockMerchantWrap>
        <TextHeader>DEMO MERCHANT</TextHeader>
        <SaleTextHeader>{`Order ${paymentStatus}`}</SaleTextHeader>
        <MockMerchant>
          <SaleImgWrap>
            <img src={Dunk} alt="Nike Dunk Shoe" width="150" />
          </SaleImgWrap>
        </MockMerchant>
      </MockMerchantWrap>
      <FormButton
        buttonText={"Reset Demo"}
        onClick={() => reset()}
      ></FormButton>
    </FormWrapper>
  );
}

// Styled components
const SaleTextHeader = styled.p`
  margin: 20px 0 10px 0;
  font-family: "Space Mono";
  font-size: 16px;
`;

const SaleImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 20px 0px;
`;

const Text = styled.p`
  color: dark-grey;
  font-size: 14px;
  margin: 30px 0px;
`;

const MockMerchant = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  align-content: space-between;
`;

const MockMerchantWrap = styled.div`
  padding-top: 10px;
  border-top: 0.5px solid lightgrey;
`;

const TextHeader = styled.p`
  margin: 20px 0 10px 0;
  font-family: "Space Mono";
  font-weight: 700;
  font-size: 16px;
`;
