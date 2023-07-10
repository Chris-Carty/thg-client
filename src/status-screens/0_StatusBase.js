import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OrderStatus from "./2_OrderStatus";
import PageLoading from "./PageLoading";
import Logo from "../assets/O2.png";
import api from "../utils/api";

export default function Pay() {
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
    <Container>
      <BodyWindow>
        <HeaderBanner>
          <img src={Logo} alt="Logo" height="14" />
        </HeaderBanner>
        <Body>
          <React.Fragment>
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          </React.Fragment>
        </Body>
      </BodyWindow>
    </Container>
  );
}

// Styled Components
const Container = styled.section`
  max-width: 100vw;
  min-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
  background: #242d35;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BodyWindow = styled.section`
  background: rgba(255, 255, 255, 255);
  font-weight: 200;
  max-width: 475px;
  min-width: 475px;
  max-height: 750px;
  min-height: 750px;
  padding: 30px 20px 20px 20px;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 500px) {
    max-width: 100%;
    min-width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    overflow-x: hidden !important;
    background: rgba(255, 255, 255, 255);
  }
`;

const HeaderBanner = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 0px 0px;
  min-height: 50px;
  max-height: 50px;
  margin: -30px -20px;
  padding: 0px 20px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 3px 6px;

  @media (max-width: 500px) {
    min-height: 45px;
    max-height: 45px;
  }
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;
