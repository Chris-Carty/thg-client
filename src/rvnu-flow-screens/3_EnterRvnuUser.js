import React, { useState, useEffect } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/Subtitle'
import HelperText from '../rvnu-components/HelperText'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/ErrorMsg';
import TextFieldUser from '../rvnu-components/TextField';
import api from '../utils/api'


export default function EnterRvnuUser({activeStep, setActiveStep}) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Error messages
  const [error, setError] = useState(false);
  // RVNU Username entered
  const [rvnuUserRec, setRvnuUserRec] = useState('');
  // Disbale button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = event => {
    setRvnuUserRec(event.target.value);
  };

  useEffect(() => {
    // Remove error text
    setError(false)
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
      console.log(rvnuUserRec)
      setLoading(true)
    } else {
      setError(true)
    }
  }



  return (

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
      { error ? <ErrorMsg errorText={'Invalid user, please try again.'} /> : <p></p> }
    </FormWrapper>

  )
}
