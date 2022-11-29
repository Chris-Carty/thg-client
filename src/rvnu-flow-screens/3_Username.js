import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InputAdornment from '@mui/material/InputAdornment';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import SuccessMsg from '../rvnu-components/text/SuccessMsg';
import TextFieldUser from '../rvnu-components/text/TextField';
import UsernameInfo from '../rvnu-components/text/UsernameInfo'
import MouseOverPopover from '../rvnu-components/text/Popover'
import api from '../utils/api'


export default function Username({activeStep, setActiveStep}) {
  // Regualr expression for username
  const regExp = new RegExp("^([A-Za-z0-9_]{4,15})$");
  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Error messages
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('This username is already taken.');
  // Success message
  const [success, setSuccess] = useState(false);
  // RVNU Username entered
  const [username, setUsername] = useState('');
  // Disbale button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  // Delay next step to show success message to user
  const delayLoad = () => {
    setLoading(true)
    setTimeout(getUsername, 500)
  };

  useEffect(() => {
    // Remove error text
    setError(false)
    setSuccess(false)

    if (regExp.test(username)) {
        setIsButtonDisabled(false);
    } else {
        setIsButtonDisabled(true);
    }


  }, [username]);


  const getUsername = async () => {

    try{
     api
     .get(`user/username/` + username, {
       username,
     })
     .then(async (response) => {

      const result = response.data.data

          if (result.length === 0) {
            
          localStorage.setItem("Username", String(username))
          setActiveStep(activeStep + 1)
          setLoading(false)
          setError(false)

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
      <Subtitle subtitleText={"Choose a RVNU username"} >
        <AccountCircleIcon margin-right={10}/>
      </Subtitle>
      <HelperText text={`Username`} />

      <TextFieldUser
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={error}
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
       />

      <EducationWrapper>
          <UsernameInfo infoText={`This will be the username you share to earn, so make it a good one \u{1F609} \u{1F4B8}`} />
      </EducationWrapper>


      <FormButton
      loading={loading}
      isButtonDisabled={isButtonDisabled}
      buttonText={"Next"}
      disabledButtonText={"Next"}
      onClick={ () => delayLoad() }
      >
      </FormButton>
      <Help>
        <MouseOverPopover 
          popoverTextA={"I need help"}
          popoverTextB={"A RVNU username can only contain letters A-Z, numbers 0-9, and underscores."}
          popoverTextC={"Your username cannot be shorter than 4 characters or longer than 15."}
        />
      </Help>
      { error ? <ErrorMsg errorText={errorText} /> : <p></p> }
      { success ? <SuccessMsg SuccessText={'RVNU username accepted'} /> : <p></p> }
    </FormWrapper>

  )
}

// Styled Components
const EducationWrapper = styled.section`
  display: flex;
  flex-direction: column;
`

// Styled Components
const Help = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

`