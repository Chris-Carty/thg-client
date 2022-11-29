import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import FormButton from '../rvnu-components/Button'
import 'react-phone-number-input/style.css'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import HelperText from '../rvnu-components/text/HelperText';
import PhoneInputCustom from '../rvnu-components/text/PhoneInput'
import DateOfBirth from '../rvnu-components/DateOfBirth'
import TextFieldUser from '../rvnu-components/text/TextField'
import clearStorage from '../utils/clearStorage';
import api from '../utils/api'
//import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
//import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
//import { Password } from '@mui/icons-material';



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
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    // Remove error text
    clearStorage()

  }, []);

  useEffect(() => {
    // Remove error text
    setError(false)

  }, [firstname, lastname, mobile]);

    const dobFieldtest = (test) => {
      switch (test) {
        case null:
          return false;
        default:
          return true;
      }
  }

  const delayLoad = () => {
    setLoading(true)
    setTimeout(handleSubmit, 350)
  }

  const handleSubmit = () => {

    // DOB
    const month = localStorage.getItem("dob-month")
    const day = localStorage.getItem("dob-day")
    const year = localStorage.getItem("dob-year")
    const dob = `${day}-${month}-${year}`

    if (
      dobFieldtest(month) && 
      dobFieldtest(day) && 
      dobFieldtest(year) && 
      firstname && 
      lastname && 
      mobile > 3) {

        checkUserExists(mobile, dob)
        
      } else {
        setError(true)
        setLoading(false)
      }

}

const checkUserExists = async (mobile, dob) => {
  // If mobile number has been provided, check if Rvnu user exists
  const phoneNumber = '+' + mobile

  try{
    api
    .get(`/user/getName/` + phoneNumber, {
      num: phoneNumber,
    })
    .then(async (response) => {
      const result = response.data.data

        if (result.length === 1) {
          
            setErrorText("Looks like you've already signed up.")
            setError(true)
            setLoading(false)
            console.log("Error: user already exists")

        } else {

          localStorage.setItem("Firstname", String(firstname))
          localStorage.setItem("Lastname", String(lastname))
          localStorage.setItem("Mobile", String(phoneNumber))
          localStorage.setItem("dateOfBirth", String(dob))
  
          // Remove uneccessary vars  
          localStorage.removeItem('dob-day')
          localStorage.removeItem('dob-month')
          localStorage.removeItem('dob-year')
          setLoading(false)
          setError(false)

          // Uncomment for production
          //sendOtp(phoneNumber)
          // Comment for production
          setActiveStep(activeStep + 1)

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
/*
// FOR WHEN PASSWORDS ARE ENABLED

  const handleSubmit = () => {
    // your submit logic
    console.log(values)
    // Check email and phone number do not exisit
}

const handleChange = (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value });
};


useEffect(() => {
       // custom validation rule will have name 'isPasswordMatch'
       ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== values.password) {
            return false;
        }
        return true;
    });
}, [values.password]);

*/

  return (

    <FormWrapper>
      <Subtitle subtitleText={"Create your account"} >
          <AccountCircleIcon />
      </Subtitle>
            {/* FIRST NAME */}
            <HelperText text={`Name`} />
              <TextFieldUser
                  required
                  autoFocus
                  id="firstName"
                  placeholder="Firstname" 
                  autoComplete="given-name"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
              />
              <TextFieldUser
                  required
                  placeholder="Lastname"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
              />
            {/* 
            <TextValidator
                fullWidth
                autoFocus
                id="firstName"
                label="Firstname" 
                placeholder="First Name" 
                autoComplete="given-name"
                value={values.firstname}
                onChange={handleChange('firstname')}
                validators={['required']}
                errorMessages={['What’s your firstname?']}
            />
            {/* LAST NAME 
            <TextValidator
                fullWidth
                label="Lastname"  
                placeholder="Last Name"
                autoComplete="family-name"
                value={values.lastname}
                onChange={handleChange('lastname')}
                validators={['required']}
                errorMessages={['What’s your lastname?']}
            />
            {/* EMAIL 
            <TextValidator
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email"
                value={values.email}
                onChange={handleChange('email')}
                validators={['required', 'isEmail']}
                errorMessages={['Please enter a valid email.', 'Please enter a valid email.']}
            />

            {/* PASSWORD 
            <TextValidator
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange('password')}
                validators={['required', 'matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$']}
                errorMessages={['this field is required', 'password is not valid']}
            />
             {/* CONFIRM PASSWORD 
             <TextValidator
                fullWidth
                label="Confirm Password"
                name="repeatPassword"
                type="password"
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['this field is required', 'password mismatch']}
            />
             */}
             <HelperText text={`Phone`} />
             <PhoneInputCustom 
              required
              error={error}
              value={mobile}
              onChange={num => setMobile(num)}
            />
            <DateOfBirthWrap>
              <HelperText 
                text={`Date of birth`} 
              />
              <TextWrap>
                <Text>
                  This will not be shown publicly. Confirm your own age.
                </Text> 
              </TextWrap>
              <DateOfBirth />
            </DateOfBirthWrap>
            <FormButton
              fullWidth
              type="submit"
              loading={loading}
              isButtonDisabled={isButtonDisabled}
              disabledButtonText={"Next"}
              buttonText={"Next"}
              onClick={() => delayLoad()}
            >
            </FormButton>
            {/*
       */}
      { error ? <ErrorMsg errorText={errorText} /> : <p></p> }
    </FormWrapper>
  )
}


// Styled components
const DateOfBirthWrap = styled.section`
  margin-top: 10px;
`
const TextWrap = styled.section`
  margin-bottom: 25px;
`
const Text = styled.section`
  font-size: 14px;
`