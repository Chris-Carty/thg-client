import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Form from './1_Form';
import OrderSuccess from './2_OrderSuccess';
import OrderFailed from './3_OrderFailed';
import RvnuLogo from '../rvnu-assets/RVNU-black.png';

// Steps in the RVNU payment flow
const steps = ['Form', 'OrderSuccess', 'OrderFailed'];

export default function Rvnu() {

  // Set activeStep in RVNU checkout flow
  const storedValueAsNumber = Number(localStorage.getItem('activeStep'));
  const [activeStep, setActiveStep] = useState(
    Number.isInteger(storedValueAsNumber) ? storedValueAsNumber : 0
  );

  // Store step in RVNU flow in local storage
  useEffect(() => {
    localStorage.setItem("activeStep", String(activeStep))
  }, [activeStep]);

  // Determine which Component to render depending on which activeStep the user is at in the RVNU flow
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form 
                  activeStep={activeStep} 
                  setActiveStep={setActiveStep} 
                />;
      case 1:
        return <OrderSuccess
                  activeStep={activeStep}
                  setActiveStep={setActiveStep} 
               />;
      default:
        throw new Error('Unknown step');
    }
}

  return (
    <RvnuContainer>
        <BodyWindow>
            <Header>
                <img src={RvnuLogo}
                      alt="RVNU Logo" 
                      height="14"

                />
            </Header>
            <Body>
                <React.Fragment>
                    {activeStep === steps.length ? (
                    <React.Fragment>
                    <OrderFailed
                    />
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                    </React.Fragment>
                    )}
                </React.Fragment>
            </Body>
        </BodyWindow>
    </RvnuContainer>
  )
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
`

const BodyWindow = styled.section`
  background: rgba(255,255,255,255);
  font-weight: 200;
  max-width: 500px;
  min-width: 500px;
  max-height: 750px;
  min-height: 750px;
  padding: 20px;
  box-sizing:border-box;
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
    background: rgba(255,255,255,255);
  }
`

const Header = styled.section`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 10px 0px 20px 0px;
`

const Body = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: auto;
`