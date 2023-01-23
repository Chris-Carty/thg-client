import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderStatus from "./2_OrderStatus";
import PageLoading from "./PageLoading";
import RvnuLogo from "../rvnu-assets/RVNU-black.png";
import api from "../utils/api";

export default function Rvnu() {
  // Set activeStep in RVNU checkout flow
  const [activeStep, setActiveStep] = useState(0);
  // Set payment status var
  const [paymentStatus, setPaymentStatus] = useState();

  useEffect(() => {
    // Extract URL params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("payment_id")) {
      // extract paymentId from URL params
      const payment_id = urlParams.get("payment_id");
      // Get status of transfer linked to paymendId.
      getPaymentStatus(payment_id);
    } else {
      // If no paymentId in URL, restart demo.
      window.open("https://rvnu-demo.app", "_self");
    }
  }, []);

  const getPaymentStatus = async (paymentId) => {
    try {
      api
        .get(`/payments/requests/transfers/${paymentId}`, {
          paymentId,
        })
        .then(async (response) => {
          const status = response.data.WebhookStatus;

          if (status === "payment_settled" || status === "payment_executed") {
            setPaymentStatus("Successful");
            setTimeout(delayLoad, 1000);
          } else if (status === "payment_failed") {
            setPaymentStatus("Failed");
            setTimeout(delayLoad, 1000);
          } else {
            setPaymentStatus("Failed");
            setTimeout(delayLoad, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("Error: could not retrieve payment status");
    }
  };

  // Determine which Component to render depending on which activeStep the user is at in the RVNU flow
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PageLoading />;
      case 1:
        return (
          <OrderStatus
            paymentStatus={paymentStatus}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const delayLoad = () => {
    setActiveStep(1);
  };

  return (
    <RvnuContainer>
      <BodyWindow>
        <Header>
          <img src={RvnuLogo} alt="RVNU Logo" height="15" />
        </Header>
        <Body>
          <React.Fragment>
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          </React.Fragment>
        </Body>
      </BodyWindow>
    </RvnuContainer>
  );
}

// Styled Components
const RvnuContainer = styled.section`
  max-width: 100vw;
  min-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
  background: #262626;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BodyWindow = styled.section`
  background: rgba(255, 255, 255, 255);
  font-weight: 200;
  max-width: 500px;
  min-width: 500px;
  max-height: 750px;
  min-height: 750px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    max-width: 100%;
    min-width: 100%;
    max-height: 100vh;
    min-height: 100vh;
    padding: 5px;
    overflow-x: hidden !important;
    background: rgba(255, 255, 255, 255);
  }
`;

const Header = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;
