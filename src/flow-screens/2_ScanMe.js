import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormWrapper from "../components/FormWrapper";
import QRCode from "react-qr-code";
import getCookie from "../utils/getCookie";
import api from "../utils/api";
import CircularProgress from '@mui/material/CircularProgress';

export default function ScanMe({ activeStep, setActiveStep }) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Loading Spinner for button
  const [error, setError] = useState(false);
  // Get TinkLinkUrl cookie
  const tinkLinkUrl = getCookie("tinkLinkUrl");
  // Extract transaction id from URL
  const url = new URL(tinkLinkUrl);
  const transaction_id = url.searchParams.get("payment_request_id");

  // Trigger poll for payment status
  useEffect(() => {
    // Update the document title using the browser API
     getPaymentStatus()
  });

  const stepBack = () => {
     setLoading(false)
     setError(true)
     setActiveStep(activeStep - 1);
  }

  const getPaymentStatus = async () => {
    
    console.log("Polling")

    try {
      api
        .get(`/polling/getStatus/${transaction_id}`, {
          transaction_id
        })
        .then(async (response) => {
          const response_obj = response.data.status_object.paymentRequestCreatedTransfers[0]

              if (!response_obj) {

                 setTimeout(getPaymentStatus, 1200);

              } else if (response_obj) {

                if (response_obj.status === 'AWAITING_CREDENTIALS' || response_obj.status === 'CREATED') {
                // Present loading spinner
                setLoading(true)
                // Keep polling
                setTimeout(getPaymentStatus, 5000);
              } else if (response_obj.status === 'SETTLED') {
                // present refund button
                setActiveStep(activeStep + 1);
              }
              else if (response_obj.status === 'CANCELLED' || response_obj.status === 'FAILED') {
                // RESET DEMO
                setTimeout(stepBack, 2000)
              }

            }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("Error updating session mobile number");
    }
  
  };

  return (
    <FormWrapper>
       <Text0>
        Scan the QR code with your phone's camera and follow the instructions
      </Text0>
      <div style={{ display: 'flex', justifyContent: 'center', height: "auto", margin: "0 auto", maxWidth: 250, width: "100%" }}>
        { loading ? 
        <CircularProgress sx={{color: "black"}} />
         :
         <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={tinkLinkUrl}
          viewBox={`0 0 256 256`}
        /> }
      </div>
       { error ? 
        <Text1>Payment failed. The demo will now reset.</Text1>
         :
        <Text1></Text1> }
    </FormWrapper>
  );
}

// Styled comononets
const Text0 = styled.p`
  margin: 40px 0px 40px 0px;
  text-align: center;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;

const Text1 = styled.p`
  margin: 40px 0px 40px 0px;
  text-align: center;
  font-weight: 700;
  color: red;

  @media (max-width: 350px) {
    font-size: 14px;
  }
`;
