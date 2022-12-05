import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BoltIcon from '@mui/icons-material/Bolt';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import FormButton from '../rvnu-components/Button'
import 'react-phone-number-input/style.css'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import HelperText from '../rvnu-components/text/HelperText';
import PayByBankInfo from '../rvnu-components/text/PayByBankInfo'
import TextFieldUser from '../rvnu-components/text/TextField'
import clearStorage from '../utils/clearStorage';
import api from '../utils/api'
import BankLogos from '../rvnu-assets/bankLogos.svg';
import RvnuLogo from '../rvnu-assets/RVNU-black.png';
import RvnuLogo from '../rvnu-assets/RVNU-black.png';



export default function Form({activeStep, setActiveStep}) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Disbale button
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Error messages
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('All fields are required');
  // phoneNumber entered bu user will be in E.164 format.

  // Required From Fields
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');

  useEffect(() => {
    // Remove error text
    clearStorage()

  }, []);

  useEffect(() => {
    // Remove error text
    setError(false)

  }, [payer, amount]);


  const delayLoad = () => {
    setLoading(true)
    setTimeout(initiatePayment, 350)
  }

  const initiatePayment = async () => {
    setLoading(true)
  }



  return (

    <FormWrapper>
      <Subtitle subtitleText={"RVNU Pay - UAT"} >
          <AccountBalanceIcon />
      </Subtitle>
            <HelperText text={`Welcome to the RVNU user acceptance testing (UAT) space.`} />
            <HelperText text={`This site is primarily built for RVNU ambassadors to evaluate the RVNU payment experience and provide feedback.`} />
            <HelperText text={``} />
            <HelperText text={`Payer name`} />
            <TextFieldUser
                    required
                    id="firstName"
                    placeholder="Your name" 
                    autoComplete="given-name"
                    value={payer}
                    onChange={e => setPayer(e.target.value)}
            />
            <HelperText text={`Payment amount`} />
            <TextFieldUser
                  required
                  placeholder="Amount yout wish to pay" 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
            />

            <PayByBankWrap>
              <InstantBankTextWrap>
                <HeadlineWrap>
                  <BoltIcon />
                  <img src={RvnuLogo}
                      alt="RVNU Logo" 
                      height="25"
                  />
                </HeadlineWrap>
                <img src={BankLogos}
                      alt="RVNU Logo" 
                      height="25"
                  />
              </InstantBankTextWrap>
              <EducationWrapper>
                <PayByBankInfo infoText={'Pay instantly via online bank transfer directly from your current account.'} />
                <PayByBankInfo infoText={'Hassle-free. Connect to your bank without entering data manually'} />
                <PayByBankInfo infoText={'We accept all major UK banks'} />
              </EducationWrapper>
            </PayByBankWrap>
            <FormButton
              type="submit"
              loading={loading}
              isButtonDisabled={isButtonDisabled}
              disabledButtonText={"Pay with RVNU"}
              buttonText={"Pay with RVNU"}
              onClick={() => delayLoad()}
            >
            </FormButton>
      { error ? <ErrorMsg errorText={errorText} /> : <p></p> }
    </FormWrapper>
  )
}

// Styled comononets
const PayByBankWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #3d984a;
  border-radius: 10px;
  padding: 10px;
`

const InstantBankTextWrap = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
`

const HeadlineWrap = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.p`
`

const EducationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border: 0.5px solid;
  border-radius: 6px;
`
