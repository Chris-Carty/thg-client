import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Form from './1_Form';
import OrderSuccess from './2_OrderSuccess';
import OrderFailed from './3_OrderFailed';
import TsAndCs from '../rvnu-components/text/TsAndCs';
import PayShareEarn from '../rvnu-components/text/PayShareEarn';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import clearStorage from '../utils/clearStorage';

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

  const stepBackButton = (step) => {
    if (step === 0 || step >= 2 ) {
        return <ArrowBackIcon onClick={() => setActiveStep(activeStep - 1)} fontSize="small" visibility="hidden" />;
    } else {
        return <ArrowBackIcon onClick={() => setActiveStep(activeStep - 1)} fontSize="small" style={{ color: 'grey' }}/>;
    }
  }

  //Redirect back to merchant
  // TODO APPEND UNIQUE ID TO THIS CHECKOUT FLOW (RECORD THIS IN A TABLE IN DB)
  const merchantRedirect = async () => {
      clearStorage()
      window.open(`http://localhost:3001`, '_self')
  }
  

  return (
    <RvnuContainer>
        <BodyWindow>
            <Header>
               {stepBackButton(activeStep)}
                <IconButton
                  size='small'
                  onClick={() => merchantRedirect()}
                  >
                  <HomeIcon  size='small' style={{ color: 'grey' }}/>
                  
                </IconButton>
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
            <PayShareEarn />
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
  overflow: hidden;
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
    overflow-y: hidden  !important;
    background: rgba(255,255,255,255);
  }
`

const Header = styled.section`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`

const Body = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: auto;
`