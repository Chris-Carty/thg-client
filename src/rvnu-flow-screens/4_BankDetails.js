import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TextField from '@mui/material/TextField';
import FormButton from '../rvnu-components/Button'
import SelectBank from '../rvnu-components/SelectBank';
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import MouseOverPopover from '../rvnu-components/text/Popover'
import TsAndCs from '../rvnu-components/text/TsAndCs'
import api from '../utils/api'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ChangeAccount({activeStep, setActiveStep}) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Bank Account details to update
  const [providerId, setProviderId] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountNum, setAccountNum] = useState('');
  // Error messages
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Please check all details have been entered correctly.');
  // Disbale button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setError(false)

    if (providerId !== '' & sortCode.length === 6 & accountNum.length === 8) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

  }, [providerId, sortCode, accountNum])


  const delayLoad = () => {
		setLoading(true);
    setTimeout(createAccount, 250)
  }

  // Update users preferred payment account in the DB
  const createAccount = async () => {

      // Retrieve account info from local storage
      const firstname = localStorage.getItem("Firstname")
      const lastname = localStorage.getItem("Lastname")
      const username = localStorage.getItem("Username")
      const mobile = localStorage.getItem("Mobile")
      const dob = localStorage.getItem("dateOfBirth")

      try{
        api
        .post(`/user/createAccount/${firstname}/${lastname}/${username}/${mobile}/${dob}/${accountNum}/${sortCode}/${providerId}`, {
          firstname,
          lastname,
          username,
          mobile,
          dob,
          accountNum,
          sortCode,
          providerId
        })
        .then(async (response) => {

          if (response.data.data.affectedRows === 1) {
            setActiveStep(activeStep + 1)
            setLoading(false)
          } else {
            setError(true)
            setErrorText("Unable to create account at this time. Please try again later.")
          }
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
      } catch {
          console.log("Updating Bank Account API call error")
          setLoading(false)
      }
  }


  return (
    <FormWrapper>
      <Subtitle subtitleText={"Link Bank Account"} >
          <AccountBalanceIcon margin-right={10}/>
      </Subtitle>
  
      <HelperText text={`Bank Name`} />
      <SelectBank 
        provider={providerId}
        setProviderId={setProviderId}
      />
      <TextFieldWrapper>
      <HelperText text={`Sort code`} />
        <TextField 
          fullWidth
          id="outlined-basic"
          placeholder="6 digits without spaces or hyphen"
          value={sortCode}
          onChange={e => setSortCode(e.target.value)}
          error={error}
        />
      </TextFieldWrapper>
      <TextFieldWrapper>
      <HelperText text={`Account number`} />
        <TextField
          fullWidth
          placeholder="8 digits"
          error={error}
          value={accountNum}
          onChange={e => setAccountNum(e.target.value)}
        />
      </TextFieldWrapper>
      <CheckBoxWrapper>
        <Checkbox value="allowExtraEmails" color="primary" />
        <TsAndCs/>
      </CheckBoxWrapper>
      <FormButton
        loading={loading}
        isButtonDisabled={isButtonDisabled}
        buttonText={"Create RVNU account"}
        disabledButtonText={"Create RVNU account"}
        onClick={ () => delayLoad() }
       />
      <Help>
        <MouseOverPopover
          popoverTextA={"Why do you need my bank details?"}
          popoverTextB={"This will enable us to speed up your future payments when you pay with RVNU at your favourite stores or venues."}
          popoverTextC={"We will NEVER share this information & you will NEVER be charged when paying with RVNU."} 
        />
      </Help>
      { error ? <ErrorMsg errorText={errorText} />
          : <p></p> }
  </FormWrapper>
  )
}

// Styled Components
const TextFieldWrapper = styled.div`
  margin-top: 10px;
`

// Styled Components
const Help = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// Styled Components
const CheckBoxWrapper = styled.section`
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: 10px;
`
