import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";
import Form from "./1_Pay";
import ScanMe from "./2_ScanMe"
import Refund from "./3_Refund"
import Logo from "../assets/O2.png";
import getCookie from "../utils/getCookie";
import clearCookies from "../utils/clearCookies";

export default function Base() {

  const steps = ["PayByBank", "ScanMe", "Refund"];
  // Set activeStep in flow
  const storedValueAsNumber = Number(getCookie("activeStep"));
  const [activeStep, setActiveStep] = useState(
    Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 0
  );

  // Store step in flow in local storage
  useEffect(() => {
    //localStorage.setItem("activeStep", String(activeStep))
    document.cookie = `activeStep=${activeStep}`;
  }, [activeStep]);

  // Determine which Component to render depending on which activeStep the user is at in the flow
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form activeStep={activeStep} setActiveStep={setActiveStep} />;
      case 1:
        return <ScanMe activeStep={activeStep} setActiveStep={setActiveStep} />;
      case 2:
        return <Refund activeStep={activeStep} setActiveStep={setActiveStep} />;
      default:
        throw new Error("Unknown step");
    }
  };

    const stepBackButton = (step) => {
    if (step === 1) {
      return (
        <IconButton size="small" onClick={() => stepBack()}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="small" onClick={() => stepBack()}>
          <ArrowBackIcon fontSize="small" visibility="hidden" />
        </IconButton>
      );
    }
  };

  const cancelButton = (step) => {
    if (step === 4) {
      return (
        <IconButton size="small" onClick={() => cancel()}>
          <CloseIcon
            visibility="hidden"
            size="small"
            style={{ color: "grey" }}
          />
        </IconButton>
      );
    } else {
      return (
        <IconButton size="small" onClick={() => cancel()}>
          <CloseIcon size="small" style={{ color: "grey" }} />
        </IconButton>
      );
    }
  };

  const cancel = async () => {
    clearCookies();
    setActiveStep(0)
    window.location.reload();
  };

  const stepBack = async () => {
    clearCookies();
    setActiveStep(activeStep - 1)
  };

  return (
    <Container>
      <BodyWindow>
        <HeaderBanner>
          {stepBackButton(activeStep)}
          <img src={Logo} alt="Logo" height="30" />
          {cancelButton(activeStep)}
        </HeaderBanner>
        <Body>
          <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
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
  background: #000000;
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
  justify-content: space-between;
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
