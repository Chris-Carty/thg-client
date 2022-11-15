import React, { useState, useEffect } from 'react'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import FormButton from '../rvnu-components/Button'
import api from '../utils/api'
import 'react-phone-number-input/style.css'
import PhoneInputCustom from '../rvnu-components/text/PhoneInput'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';


export default function SendOtp({activeStep, setActiveStep}) {

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Disbale button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // Error messages
  const [error, setError] = useState(false);
  // phoneNumber entered bu user will be in E.164 format.
  const [inputNumber, setInputNumber] = useState('447527943282');

  useEffect(() => {
    // Remove error text
    setError(false)
    // Disable button whilst OTP input legnth < 6
    if (inputNumber == null) {
        setIsButtonDisabled(true);
    } else if (inputNumber.length > 9) {
        setIsButtonDisabled(false);
    } else {
        setIsButtonDisabled(true);
    }
  }, [inputNumber]);


  const checkUserExists = async () => {
      // If mobile number has been provided, check if Rvnu user exists
      setLoading(true)
      const phoneNumber = '+' + inputNumber

      try{
        api
        .get(`/user/getName/` + phoneNumber, {
          num: phoneNumber,
        })
        .then(async (response) => {
          const result = response.data.data

            if (result.length === 1) {

              const firstName = result[0].FirstName
              
              // Set session vars for use in 'OtpVerify.js'
              localStorage.setItem("firstName", firstName)
              localStorage.setItem("phoneNumber", phoneNumber)

              // Delete for production
              setActiveStep(activeStep + 1)

              // Uncomment for production
              //sendOtp(phoneNumber)

            } else {
              console.log("Error user does not exist")
              setLoading(false)
              setError(true)
            }
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
      } catch {
        console.log("Request Error")
        setLoading(false) 
      }
  }

  const sendOtp = async (phoneNumber) => {

      // If mobile number has been provided, request OTP code
      try{
        api
        .post(`/verify/sendOtp/` + phoneNumber, {
          phoneNumber: phoneNumber
        })
        .then(async (response) => {
          setLoading(false)
          setActiveStep(activeStep + 1)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          setError(true)
        })
      } catch {
        console.log("Error sending OTP text") 
        setLoading(false)
      }

}

  return (

    <FormWrapper>
      <Subtitle subtitleText={"Let's do a quick verification"} >
        <VerifiedUserIcon />
      </Subtitle>
      <HelperText text={"To secure your payment, we need to verify it’s you. Enter your mobile phone number to get started."} />
      <PhoneInputCustom 
        error={error}
        value={inputNumber}
        onChange={phone => setInputNumber(phone)}
      />
      <FormButton
        loading={loading}
        isButtonDisabled={isButtonDisabled}
        buttonText={"Next"}
        onClick={ () =>  checkUserExists() }>
      </FormButton>
      { error ? <ErrorMsg errorText={'Error, please try again.'} /> : <p></p> }
    </FormWrapper>

  )
}
