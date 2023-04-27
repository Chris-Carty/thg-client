import React, { useState } from "react";
import styled from "styled-components";
import Form from "./1_Form";
import RvnuLogo from "../rvnu-assets/RVNU-black.png";

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
        <HeaderBanner>
          <img src={RvnuLogo} alt="RVNU Logo" height="14" />
        </HeaderBanner>
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
  margin-bottom: 10px;
`;
