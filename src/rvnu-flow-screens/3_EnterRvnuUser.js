import React, { useState, useEffect } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/Subtitle'
import HelperText from '../rvnu-components/HelperText'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/ErrorMsg';
import SuccessMsg from '../rvnu-components/SuccessMsg';
import TextFieldUser from '../rvnu-components/TextField';
import api from '../utils/api'


export default function EnterRvnuUser({activeStep, setActiveStep}) {

  // Get Payer AccountID to ensure they do not use their own username. 
  const payerAccount = JSON.parse(localStorage.getItem('payerRvnuAccount'))
  const payerAccountId = payerAccount.AccountID
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

  // If OTP lenght equals 6, verfiy it. 
  const isValidUser = () => {

    if (rvnuUserRec == null) {
      setError(true)
    } else if (rvnuUserRec.length >= 6) {
      isRecommenderValid()
    } else {
      setError(true)
    }
  }

  const isRecommenderValid = async () => {
     
    setLoading(true)
     const username = rvnuUserRec

     try{
      api
      .get(`/user/recommender/` + username, {
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
            setActiveStep(activeStep + 1)
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
      <Subtitle subtitleText={"Enter RVNU username"} >
        <GroupIcon margin-right={10}/>
      </Subtitle>
      <HelperText text={"Enter the username of the friend or family member than sent you here."} />

      <TextFieldUser
        autoFocus
        value={rvnuUserRec}
        onChange={handleChange}
        error={error}
       />

      <FormButton
      loading={loading}
      isButtonDisabled={isButtonDisabled}
      buttonText={"Next"}
      onClick={ () => isValidUser() }
      >
      </FormButton>
      { error ? <ErrorMsg errorText={'This username is invalid.'} /> : <p></p> }
      { success ? <SuccessMsg SuccessText={'RVNU username accepted.'} /> : <p></p> }
    </FormWrapper>

  )
}
