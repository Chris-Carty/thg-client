import React, { useState } from "react";
import styled from "styled-components";
import FormWrapper from "../components/FormWrapper";
import RefundButton from "../components/RefundButton";
import api from "../utils/api";
import Colin from "../assets/colin-giphy.gif";
import getCookie from "../utils/getCookie";

export default function Form() {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Refund status
  const [refundSuccess, setRefundSuccess] = useState(false);
  // Get TinkLinkUrl cookie
  const tinkLinkUrl = getCookie("tinkLinkUrl");
  // Extract transaction id from URL
  const url = new URL(tinkLinkUrl);
  const transaction_id = url.searchParams.get("payment_request_id");

  const delayLoad = () => {
    setLoading(true)
    setTimeout(refundTransaction, 800)
  };


  const refundTransaction = async () => {
    try {
      api
        .post(`/refund/createRefund/${transaction_id}`, {
          transaction_id
        })
        .then(async (response) => {
          if (response.status === 200) {
            setLoading(false)
            setRefundSuccess(true)
          }
        })
        .catch((error) => {
          setLoading(false)
          console.log(error);
        });
    } catch {
      setLoading(false)
      console.log("Error");
    }
  };


  const realPayment = <BoldText>Payment settled successfully</BoldText>;

  return (
    <FormWrapper>
      <Text1>
        {realPayment} 
      </Text1>
       <Percy>
        <img src={Colin} alt="Percy Pig face" height="150" />
      </Percy>
      <Text2>
      Colin from accounts can now initiate an instant refund, just hit the refund button below!
      </Text2>
      { refundSuccess ? 
       <Text3>
          Refund sent!
        </Text3> :
        <Text3 style={{display: "none"}}>
        Refund not sent
        </Text3>
        }
      { refundSuccess ?  
      <RefundButton
        loading={loading}
        onClick={() => delayLoad()}
        style={{display: "none"}}
      >
      </RefundButton>
       : 
      <RefundButton
        loading={loading}
        onClick={() => delayLoad()}
      >
      </RefundButton>}
     
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

const Text3 = styled.p`
  margin: 0px 0px 10px 0px;
  text-align: center;
  font-weight: 700;
  color: #8ec144;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;

const BoldText = styled.a`
  font-weight: 700;
  color: #8ec144;
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
