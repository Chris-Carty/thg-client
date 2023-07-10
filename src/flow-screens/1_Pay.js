import React, { useState } from "react";
import styled from "styled-components";
import FormWrapper from "../components/FormWrapper";
import PayByBankButton from "../components/PayByBankButton";
import api from "../utils/api";
import HeroImage from "../assets/samsung-s23.png";

export default function Form({ activeStep, setActiveStep }) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Loading Spinner for button
  const [error, setError] = useState(false);

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
          setLoading(false);
          setError(true)
        });
    } catch {
      console.log("Error updating session mobile number");
      setLoading(false);
      setError(true)
    }
  };


  const realPayment = <BoldText>Checkout</BoldText>;

  return (
    <FormWrapper>
       <HeaderText>
         Samsung Galaxy S23
       </HeaderText>
       <Image>
        <img src={HeroImage} alt="Hero Image" height="160" />
      </Image>
       <Text1>
       Get ready for a refreshed Galaxy experience with the S23. Capture perfect pics after sundown with the Triple rear 50MP camera. Relive every night in perfect clarity. Get ready for a lot of “can you send me that?” 
      </Text1>
      
      <PayByBankButton
        loading={loading}
        onClick={() => delayLoad()}
      ></PayByBankButton>
      { error ? 
        <Error>Server error.</Error>
         :
        <Error></Error> 
      }
    </FormWrapper>
  );
}

// Styled comononets
const Text1 = styled.p`
  margin: 40px 0px 20px 0px;
  text-align: center;
  color: #010167;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;

const HeaderText = styled.p`
  margin: 40px 0px 0px 0px;
  text-align: center;
  color: #010167;
  font-weight: 700;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;


const BoldText = styled.a`
  font-weight: 700;
  color: #f04f97;
`;

const Image = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ededed;
  border-radius: 10px;
  height: 180px;
  margin: 30px 0px 0px 0px;
`;

const Error = styled.p`
  margin: 40px 0px 40px 0px;
  text-align: center;
  font-weight: 700;
  color: red;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;