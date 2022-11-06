import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OtpSend from './1_OtpSend';
import OtpVerify from './2_OtpVerify';
import EnterRvnuUser from './3_EnterRvnuUser';
import Redirect from './4_Redirect';
import GetPaymentStatus from './5_GetPaymentStatus';
import PaymentExecuted from './6_PaymentExecuted';
import PaymentFailed from './7_PaymentFailed';
import Filler from './Misc_Filler';


// Steps in the RVNU payment flow
const steps = ['OtpSend', 'OtpVerify', 'EnterRvnuUser', 'Redirect', 'Filler', 'GetPaymentStatus', 'PaymentExecuted'];

export default function Rvnu() {

  const merchantSaleInfo = {
    merchantID: '41784630-695b-4003-9588-89b322b59ac2',
    merchantName: 'ASOS',
    currency: 'GBP',
    amount: 79.26,
    reference: 'Merchant-X-1234',
    redirectURL: 'http://localhost:3000'
  }

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
        return <OtpSend 
                  activeStep={activeStep} 
                  setActiveStep={setActiveStep} 
                />;
      case 1:
        return <OtpVerify 
                  activeStep={activeStep}
                  setActiveStep={setActiveStep} 
                />;
      case 2:
        return <EnterRvnuUser
                  activeStep={activeStep}
                  setActiveStep={setActiveStep} 
               />;
      case 3:
        return <Redirect
                activeStep={activeStep}
                setActiveStep={setActiveStep} 
                merchantSaleInfo={merchantSaleInfo}
              />;
      case 4:
        return <Filler
                  activeStep={activeStep}
                  setActiveStep={setActiveStep} 
                />;
      case 5:
        return <GetPaymentStatus
                  activeStep={activeStep}
                  setActiveStep={setActiveStep} 
                  merchantSaleInfo={merchantSaleInfo}
              />;
      case 6:
        return <PaymentExecuted
                  merchantSaleInfo={merchantSaleInfo} 
              />;
      default:
        throw new Error('Unknown step');
    }
}

  const stepBackButton = (step) => {
    switch (step) {
      case 0:
        return <ArrowBackIcon onClick={() => setActiveStep(activeStep - 1)} fontSize="small" visibility="hidden" />;
      default:
        return <ArrowBackIcon onClick={() => setActiveStep(activeStep - 1)} fontSize="small" visibility="hidden" />;
    }
  }


  return (
    <RvnuContainer>
        <Window>
            <Header>
               {stepBackButton(activeStep)}
                <img src={require('../rvnu-assets/rvnu-logo-black.png')}
                    alt="RVNU Logo" 
                    height="12"
                />
            </Header>

            <Body>
                <React.Fragment>
                    {activeStep === steps.length ? (
                    <React.Fragment>
                    <PaymentFailed
                        merchantSaleInfo={merchantSaleInfo} 
                    />
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                    </React.Fragment>
                    )}
                </React.Fragment>
            </Body>


        </Window>
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
  justify-content: center;
  align-items: center;
  overflow: hidden;

`

const Window = styled.section`
  background: rgba(255,255,255,255);
  font-weight: 200;
  max-width: 480px;
  min-width: 480px;
  max-height: 480px;
  min-height: 480px;
  padding: 20px;
  overflow: hidden;
  box-sizing:border-box;


  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 100%;
    max-height: 100vh;
    min-height: 100vh;
    padding: 0px;
    overflow-x: hidden !important;
    overflow-y: hidden  !important;
    background: rgba(255,255,255,255);
  }
`

const Header = styled.section`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 20px;
`

const Body = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-grow: 1;
`