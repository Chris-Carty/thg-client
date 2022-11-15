import React, { useState } from 'react'
import styled from 'styled-components'
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/text/ErrorMsg';
import PayByBankInfo from '../rvnu-components/text/PayByBankInfo'
import api from '../utils/api'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MouseOverPopover from '../rvnu-components/text/Popover'
import FandS from '../rvnu-assets/FandS.svg';



export default function Redirect({activeStep, setActiveStep, merchantSaleInfo}) {

  // Error message state
  const [error, setError] = useState(false);

  // Get Payer AccountID to link to transaction. 
  const payerAccount = JSON.parse(localStorage.getItem('payerRvnuAccount'))
  const payerAccountID = payerAccount.AccountID
  const payerName = payerAccount.FirstName + ' ' + payerAccount.LastName
  const payerMobile = payerAccount.MobileNumber

  // Set Merchant info vars (coming from RvnuBase.js)
  const merchantID = merchantSaleInfo.merchantID
  const merchantName = merchantSaleInfo.merchantName
  const currency = merchantSaleInfo.currency
  const amount = merchantSaleInfo.amount
  const reference = merchantName + '-' + merchantSaleInfo.reference

  // Loading Spinner for button
  const [loading, setLoading] = useState(false);

  // Generate TrueLayer API Access Token
  const getAccessToken = () => {

    setLoading(true)

    try{
      api
      .post(`/payment/getAccessToken`)
      .then(async (response) => {

        getPaymentLink(response.data)

      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        setError(true)
      })
    } catch {
      setLoading(false)
      setError(true)
    }

  }

  // Generate unique payment link
  // This is where you redirect the user to pay by bank
  // The destination is a TrueLayer hosted payment page
  const getPaymentLink = async access_token => {

    // TODO PASS PAYMENT PARAMETERS FOR REQUEST BODY

    // Once access token is recieved, generate payment link
    try{
      api
      .post(`/payment/initiate/${access_token}/${merchantName}/${amount}/${currency}/${payerMobile}/${payerName}/${payerAccountID}/${reference}`, {
        access_token,
        merchantName,
        amount,
        currency,
        payerMobile,
        payerName,
        payerAccountID,
        reference
    })
    .then(async (response) => {
      storeTransaction(response.data)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
      setError(true)
    })

  } catch {
    setLoading(false)
    setError(true)
  }
}

// Make a record of this transaction initiation
const storeTransaction = async paymentLink => {

  // Set ID of the Recommender provided by the Payer
  const recommenderID = localStorage.getItem("recommenderID")

  const paymentID = paymentLink.slice(
    paymentLink.indexOf('=') + 1,
    paymentLink.indexOf('&'),
  );

  localStorage.setItem("paymentID", paymentID)

  try{
    api
    .post(`/payment/storeTransaction/${paymentID}/${merchantID}/${payerAccountID}/${recommenderID}/${currency}/${amount}/${reference}`, {
      paymentID,
      merchantID,
      payerAccountID,
      recommenderID,
      currency,
      amount,
      reference
    })
    .then(async (response) => {
      if (response.data.data.affectedRows === 1) {
          // Redirect user to TrueLayer
          window.open(paymentLink, "_self")
          setActiveStep(activeStep + 1)
          setLoading(true)

      } else {
          console.log("here!")
          setLoading(false)
          setError(true)
      }
      
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
      setError(true)
    })

  } catch {
    setLoading(false)
    setError(true)
  }

}
  return (

    /* NOTE ABOUT REDIRECTING TO TRUELAYER */

    <FormWrapper>  
        <FastAndSimple>
        <img src={FandS}
            alt="RVNU Logo" 
            height="25"
        />
        </FastAndSimple>     
        <Subtitle subtitleText={"Instant Bank Transfer"} >
            <ElectricBoltIcon margin-right={10}/>
        </Subtitle>
        <EducationWrapper>
          <HelperText text={"Pay via online bank transfer directly from your current account."} />
          <PayByBankInfo infoText={'One of the most secure ways to pay'} />
          <PayByBankInfo infoText={'Hassle-free. Connect to your bank without entering data manually'} />
          <PayByBankInfo infoText={'We accept all major UK banks'} />
          <MouseOverPopover />
        </EducationWrapper>
        <FormButton
        loading={loading}
        onClick={ () => getAccessToken() }
        >
        </FormButton>
        { error ? <ErrorMsg errorText={'Unable to initate payment, please try again.'} /> : <p></p> }
    </FormWrapper>

  )
}

const EducationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border: 2px solid;
  border-radius: 6px;
  padding: 30px 20px 15px 20px;
  margin: 15px 0px 20px 0px;
`

const FastAndSimple = styled.section`
  position: absolute;
  top: 75px;
  left: 35px;
`
