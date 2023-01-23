import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "./1_Form";
import FootShopLogo from "../rvnu-assets/Foot-Shop-logo.png";

export default function Rvnu() {
  // Set activeStep in RVNU checkout flow
  const [activeStep, setActiveStep] = useState(0);

  // Determine which Component to render depending on which activeStep the user is at in the RVNU flow
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <RvnuContainer>
      <BodyWindow>
        <Header>
          <img src={FootShopLogo} alt="RVNU Logo" height="70" />
        </Header>
        <Body>
          <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
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
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;
