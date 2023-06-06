import React, { useState } from "react";
import styled from "styled-components";
import FormWrapper from "../components/FormWrapper";
import PayByBankButton from "../components/PayByBankButton";
import api from "../utils/api";
import PercyPig from "../assets/percy-giphy(2).gif";

export default function Form({ activeStep, setActiveStep }) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);

  const delayLoad = () => {
    setLoading(true);
    setTimeout(getTinkLinkUrl, 800);
  };

  const getTinkLinkUrl = async () => {
    try {
      api
        .post(`/tinkLink/generate`, {
        })
        .then(async (response) => {
          setLoading(false);
          const tinkLinkUrl = response.data.url
          setActiveStep(activeStep + 1);
          document.cookie = `tinkLinkUrl=${tinkLinkUrl}`;

        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("Error updating session mobile number");
    }
  };


  const realPayment = <BoldText>real £1 payment</BoldText>;

  return (
    <FormWrapper>
      <Text1>
        Welcome to Percy's piggy bank. You will make a {realPayment} powered by Tink. Oink. 
      </Text1>
       <Percy>
        <img src={PercyPig} alt="Percy Pig face" height="160" />
      </Percy>
      <Text2>
       Colin from accounts will be able to initiate an instant refund after the transaction has settled.
      </Text2>
      
      <PayByBankButton
        loading={loading}
        onClick={() => delayLoad()}
      ></PayByBankButton>
    </FormWrapper>
  );
}

// Styled comononets
const Text1 = styled.p`
  margin: 40px 0px 0px 0px;
  text-align: center;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;

const Text2 = styled.p`
  margin: 0px 0px 10px 0px;
  text-align: center;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;


const BoldText = styled.a`
  font-weight: 700;
  color: #f04f97;
`;

const Percy = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ededed;
  border-radius: 10px;
  height: 180px;
  margin: 30px 0px;
`;
