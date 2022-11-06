import React, { useState } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/Subtitle'
import HelperText from '../rvnu-components/HelperText'
import FormButton from '../rvnu-components/Button'
import ErrorMsg from '../rvnu-components/ErrorMsg';
import api from '../utils/api'


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
  const currency = merchantSaleInfo.currency
  const amount = merchantSaleInfo.amount
  const reference = merchantSaleInfo.reference

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
      .post(`/payment/initiate/${access_token}/${amount}/${currency}/${payerMobile}/${payerName}/${payerAccountID}/${reference}`, {
        access_token,
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
      <Subtitle subtitleText={"Pay by bank"} >
        <AccountBalanceIcon margin-right={10}/>
      </Subtitle>
      <HelperText text={"Simple, secure and instant transfer with our partner TrueLayer."} />
      <HelperText text={"Choose bank account to pay from in the next step."} />
      <FormButton
      loading={loading}
      onClick={ () => getAccessToken() }
      >
      </FormButton>
      { error ? <ErrorMsg errorText={'Unable to initate payment, please try again.'} /> : <p></p> }
    </FormWrapper>

  )
}
