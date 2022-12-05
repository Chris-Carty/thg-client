import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BoltIcon from '@mui/icons-material/Bolt';
import FormWrapper from '../rvnu-components/FormWrapper'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import HelperText from '../rvnu-components/text/HelperText';
import PayByBankInfo from '../rvnu-components/text/PayByBankInfo'
import TextFieldUser from '../rvnu-components/text/TextField'
import BankLogos from '../rvnu-assets/bankLogos.svg';
import RvnuLogo from '../rvnu-assets/RVNU-black.png';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
//import api from '../utils/api'



export default function Form({activeStep, setActiveStep}) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Error messages
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('All form fields are required, please try again.');
  // Error Button Styling
  const [errorName, setErrorName] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  // Required From Fields
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');

  useEffect(() => {
    // Remove error text
    setError(false)
    setErrorAmount(false)
    setErrorName(false)

  }, [payer, amount]);


  const delayLoad = () => {
      setLoading(true)
    if (amount >= 0.25 && payer.length > 0) {

      setTimeout(initiatePayment, 350)

    } else if (amount < 0.25 && payer.length > 0) {

      setErrorText('The minimum payment amount is £0.25')
      setErrorAmount(true)
      setError(true)
      setLoading(false)

    } else if (amount < 0.25 && payer.length === 0) {

      setErrorText('All form fields are required, please try again.')
      setError(true)
      setErrorAmount(true)
      setErrorName(true)
      setLoading(false)

    } else if(amount >= 0.25 && payer.length === 0) {

      setError(true)
      setErrorName(true)
      setLoading(false)

    }
  }

  const initiatePayment = async () => {
      console.log(amount)
      console.log(payer)
      setLoading(false)
  }


  return (

    <FormWrapper>
            <HelperText text={`Welcome to the RVNU user acceptance testing (UAT) space.`} />
            <HelperText text={`This site is for RVNU ambassadors to evaluate the RVNU payment experience and provide feedback.`} />
            <HelperText text={`Please fill out the fields and select 'Pay. Share. Earn.'`} />
            <HelperText text={``} />
            <HelperText text={`Payer name`} />
            <TextFieldUser
                    required
                    id="firstName"
                    placeholder="Your name" 
                    autoComplete="given-name"
                    value={payer}
                    onChange={e => setPayer(e.target.value)}
                    error={errorName}
            />
            <HelperText text={`Payment amount`} />
            <TextFieldUser
                  type="number"
                  required
                  placeholder="Amount you wish to pay (min £0.25)" 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  error={errorAmount}
                  InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyPoundIcon sx={{height: 18}} />
                        </InputAdornment>
                      ),
                    }}
            />
            <PayByBankWrap>
              <InstantBankTextWrap>
                <HeadlineWrap>
                  <BoltIcon sx={{height: 20}} />
                  <img src={RvnuLogo}
                      alt="RVNU Logo" 
                      height="12"
                  />
                </HeadlineWrap>
                <img src={BankLogos}
                      alt="RVNU Logo" 
                      height="20"
                  />
              </InstantBankTextWrap>
              <EducationWrapper>
                <PayByBankInfo infoText={'Pay instantly via online bank transfer.'} />
                <PayByBankInfo infoText={'We accept all major UK banks.'} />
                <PayByBankInfo infoText={'Create a username to share & start earning.'} />
              </EducationWrapper>
              <FormButton
              loading={loading}
              buttonText={"Pay. Share. Earn."}
              onClick={() => delayLoad()}
            >
            </FormButton>
            </PayByBankWrap>
            { error ? <ErrorMsg errorText={errorText} /> : <p></p> }
    </FormWrapper>
  )
}

// Styled comononets
const PayByBankWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #000000;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
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

const EducationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
`
