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
      <SaleTextHeader>{`Order ${paymentStatus}`}</SaleTextHeader>
      <HelperText text={`Your order number: 12345.`} />
      <SaleImgWrap>
        <img src={Dunk} alt="Nike Dunk Shoe" width="180" />
      </SaleImgWrap>
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
  margin: 40px 0px;
`;
