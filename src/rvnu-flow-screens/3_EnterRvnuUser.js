import React, { useState, useEffect } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import SuccessMsg from '../rvnu-components/text/SuccessMsg';
import TextFieldUser from '../rvnu-components/text/TextField';
import api from '../utils/api'


export default function EnterRvnuUser({activeStep, setActiveStep,                   merchantSaleInfo}) {

  // Get Payer AccountID to ensure they do not use their own username. 
  const payerAccount = JSON.parse(localStorage.getItem('payerRvnuAccount'))
  const payerAccountId = payerAccount.AccountID
  // Set Merchant info vars (coming from RvnuBase.js)
  const merchantName = merchantSaleInfo.merchantName
  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Error messages
  const [error, setError] = useState(false);
  // Success message
  const [success, setSuccess] = useState(false);
  // RVNU Username entered
  const [rvnuUserRec, setRvnuUserRec] = useState('courgette');
  // Disbale button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = event => {
    setRvnuUserRec(event.target.value);
  };

  // Delay next step to show success message to user
  const delayLoad = () => {
    setActiveStep(activeStep + 1)
  };

  useEffect(() => {
    // Remove error text
    setError(false)
    setSuccess(false)
    // Disable button whilst OTP input legnth < 6
    if (rvnuUserRec == null) {
        setIsButtonDisabled(true);
    } else if (rvnuUserRec.length >= 6) {
        setIsButtonDisabled(false);
    } else {
        setIsButtonDisabled(true);
    }
  }, [rvnuUserRec]);

  // If Username lenght equals >= 6. 
  const isValidUser = () => {

    if (rvnuUserRec == null) {
      setError(true)
    } else if (rvnuUserRec.length >= 6) {
      setLoading(true)
      setTimeout(isRecommenderValid, 500)
    } else {
      setError(true)
    }
  }

  const isRecommenderValid = async () => {
     
     const username = rvnuUserRec

     try{
      api
      .get(`/rvnu/recommender/` + username, {
        username,
      })
      .then(async (response) => {

        const result = response.data.data

        if (result.length === 1) {

          const recommender = result[0]

          if (recommender.RvnuCodeID === null || recommender.AccountID === payerAccountId ) {
            setLoading(false)
            setError(true)
          } else {
            setSuccess(true)
            localStorage.setItem("recommenderID", recommender.AccountID)
            setTimeout(delayLoad, 1500)
          }

        } else {

          setLoading(false)
          setError(true)

        }
      })
      .catch((error) => {
        console.log(error)
        setError(true)
        setLoading(false)
      })
    } catch {
        setError(true)
        setLoading(false)
        console.log("Error: could not make verify username request") 
    }

  } 

  return (

    /* NOTE ABOUT REDIRECTING TO TRUELAYER */

    <FormWrapper>
      <Subtitle subtitleText={"Enter a RVNU username"} >
        <GroupIcon margin-right={10}/>
      </Subtitle>
      <HelperText text={`Tell us which RVNU user sent you to ${merchantName}. You'll soon be sharing and earning too.`} />

      <TextFieldUser
        autoFocus
        value={rvnuUserRec}
        onChange={handleChange}
        error={error}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmailIcon />
            </InputAdornment>
          ),
        }}
       />

      <FormButton
      loading={loading}
      isButtonDisabled={isButtonDisabled}
      buttonText={"Validate"}
      disabledButtonText={"Validate"}
      onClick={ () => isValidUser() }
      >
      </FormButton>
      { error ? <ErrorMsg errorText={'This username is invalid.'} /> : <p></p> }
      { success ? <SuccessMsg SuccessText={'RVNU username accepted.'} /> : <p></p> }
    </FormWrapper>

  )
}
