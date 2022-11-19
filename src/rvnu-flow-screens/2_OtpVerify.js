import React, { useState, useEffect } from 'react'
import SmsIcon from '@mui/icons-material/Sms';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import SuccessMsg from '../rvnu-components/text/SuccessMsg';
import api from '../utils/api'
import OtpInput from 'react-otp-input';


export default function VerifyOtp({activeStep, setActiveStep}) {

  // Get session vars
  const payerName = localStorage.getItem("firstName")
  const phoneNumber = localStorage.getItem("phoneNumber")
  // Loading Spinner for button
  const [loading, setLoading] = useState(false);
  // Error messages
  const [error, setError] = useState(false);
  // Success message
  const [success, setSuccess] = useState(false);
  // OTP Entered must be six digits
  const [inputOtp, setInputOtp] = useState();
  // Disbale button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


  useEffect(() => {
    // Remove error text
    setError(false)
    // Disable button whilst OTP input legnth < 6
    if (inputOtp == null) {
        setIsButtonDisabled(true);
    } else if (inputOtp.length === 6) {
        setIsButtonDisabled(false);
        setLoading(true)
        // UNCOMMENT FOR PRPDUCTION
        //verifyOtpCode(inputOtp)
        setTimeout(getRvnuAccount, 250)
    } else {
        setIsButtonDisabled(true);
    }
  }, [inputOtp]);

  // Delay next step to show success message to user
  const delayLoad = () => {
    setActiveStep(activeStep + 1)
  };

  // If OTP lenght equals 6, verfiy it. 
  const isValidOtp = () => {
    if (inputOtp == null) {
      setError(true)
    } else if (inputOtp.length === 6) {
      verifyOtpCode(inputOtp)
      setLoading(true)
    } else {
      setError(true)
    }
  }

  const verifyOtpCode = async (inputOtp) => {

    try{
      api
      .post(`/verify/verifyOtp/` + inputOtp + `/`+ phoneNumber, {
      inputOtp,
      phoneNumber,
      })
      .then(async (response) => {
        const result = response.data.verification_check.valid
        if (result === true) {
          getRvnuAccount()
        } 
      })
      .catch((error) => {
        setError(true)
        setLoading(false)
        console.log(error)
        console.log("Invalid OTP")
      })
    } catch {
      setLoading(false)
      console.log("Error verifying OTP")
    }

}

  
  const getRvnuAccount = async () => {

    const num = phoneNumber

     try{
      api
      .get(`/user/getUserRvnuAccount/` + num, {
        num,
      })
      .then(async (response) => {
        const result = response.data.data
        if (result.length === 1) {
          localStorage.setItem("payerRvnuAccount", JSON.stringify(result[0]))
          setSuccess(true)
          setTimeout(delayLoad, 1500)
        } else {
          setLoading(false)
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
        console.log("Error: could not verify") 
    }

  } 

  return (

    <FormWrapper>
      <Subtitle subtitleText={"Verify one-time passcode"} >
        <SmsIcon margin-right={10}/>
      </Subtitle>
      <HelperText text={`Hey ${payerName} 👋 Enter the 6-digit code sent to ${phoneNumber}.`} />
      <OtpInput
        value={inputOtp}
        onChange={e => setInputOtp(e)}
        numInputs={6}
        separator={false}
        shouldAutoFocus={true}
        isInputNum={true}
        hasErrored={error}

         inputStyle={{
                  width: "100%",
                  height: "3rem",
                  margin: "20px 4px",
                  fontSize: "20px",
                  borderRadius: 5,
                  border: "2px solid rgba(0,0,0,0.9)"
                }}
          
         errorStyle={{
                  border: "2px solid rgba(255, 0, 0, 0.7)"
                }}
      />
      <FormButton
      loading={loading}
      isButtonDisabled={isButtonDisabled}
      buttonText={"Verify"}
      disabledButtonText={"Verify"}
      onClick={ () => getRvnuAccount() }
      >
      </FormButton>
      { error ? <ErrorMsg errorText={'Invalid code, please try again.'} /> : <p></p> }
      { success ? <SuccessMsg SuccessText={'Verification successful.'} /> : <p></p> }
    </FormWrapper>

  )
}
