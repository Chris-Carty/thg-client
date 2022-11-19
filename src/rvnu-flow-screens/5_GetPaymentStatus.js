import React from 'react'
import FormWrapper from '../rvnu-components/FormWrapper'
import api from '../utils/api'
import CircularProgressLoad from '../rvnu-components/CircularProgress';


export default function GetPaymentStatus({activeStep, setActiveStep, merchantSaleInfo, commissionSmsSent, setCommissionSmsSent}) {

    // Set AccountID of recommender.
    const accountId = localStorage.getItem("recommenderID")

    // Set Details of payer. 
    const payerAccount = JSON.parse(localStorage.getItem('payerRvnuAccount'))
    const payerFirstname = payerAccount.FirstName
    const payerLastname = payerAccount.LastName
    const payerUsername = payerAccount.Username

    // Set the paymentID
    const paymentId = localStorage.getItem("paymentID")

    if (paymentId) {

        setTimeout(() => {
            getAccessToken()
        }, "2000") 
      
      }

    // Generate TrueLayer API Access Token
    const getAccessToken = () => {


    try{
        api
        .post(`/payment/getAccessToken`)
        .then(async (response) => {

        getPaymentStatus(response.data)

        })
        .catch((error) => {
        console.log(error)

        })
    } catch {
        console.log('Access Token Request Error')
    }

    }

    // Check databse to find status of the payment
    const getPaymentStatus = async (accessToken) => {
        try{
            api
            .get(`/payment/status/${accessToken}/${paymentId}`, {
                accessToken,
                paymentId,
            })
            .then(async (response) => {
                console.log(response.data)
                const paymentStatus= response.data.status
                console.log(paymentStatus)

        
            if (paymentStatus === "settled") {
                getRecommenderAccount()
                //getRecommenderAccount()
            } else if (paymentStatus === "failed") {
                setActiveStep(activeStep + 2)
            } else if (paymentStatus === "executed") {
                // Call until terminal status is found
                setTimeout(getAccessToken, "3000") 
            }
    
            })
            .catch((error) => {
              console.log(error)
            })
        } catch {
            console.log("Error: could not retrieve payment status")
        }
    }


    

    const getRecommenderAccount = async () => {
        // Get account info of user whose RVNU code is used 
        try{
          api
          .get(`/user/recommender/account/` + accountId, {
            accountId,
          })
          .then(async (response) => {
            // Recommender personal details
            const recommender = response.data.data[0]
            const recommenderName = recommender.FirstName
            const recommenderNumber = recommender.MobileNumber

            // TODO -- Send email too
            //const recommenderEmail = recommender.Email

            // Payer ( Recommender Username entered by this user)
            const payerName = `${payerFirstname} ${payerLastname}`

            // Update recommenders Total Assets 
            updateTotalAssets(accountId, paymentId)

            // Send SMS to recommender, notifying them they've earned commission
            console.log(commissionSmsSent)
            if (commissionSmsSent === 0) {
              sendRvnuCodeUsedSms(recommenderName, recommenderNumber, payerName, payerUsername, paymentId)
              setCommissionSmsSent(commissionSmsSent + 1)
            }

          })
          .catch((error) => {
            console.log(error)
          })
        } catch {
          console.log("Error: unable to get user whose RVNUcode has been used.")
        }
  
    }

    // When payment settled status is confirmed
    // update recommenders Total Assets to reflect comission earned on the sale.
    const updateTotalAssets = async (accountId, paymentId, rvnuCodeId) => {

        try{
          api
          .get(`/user/updateAssets/` + accountId + '/' + paymentId, {
            accountId,
            paymentId,
          })
          .then(async (response) => {
            setActiveStep(activeStep + 1)
          })
          .catch((error) => {
            console.log(error)
            console.log("Error: could not update user asset total.") 
          })
        } catch {
          console.log("Error: could not update user asset total.") 
        }
      
    }

    // Send SMS to Recommender notifying them they've earned some commission
    const sendRvnuCodeUsedSms = async (recommenderName, recommenderNumber, payerName, payerUsername, paymentId) => {

        const merchantName = merchantSaleInfo.merchantName
  
        // Send SMS to user whose RVNU code has been used
        try{
          api
          .post(`/verify/commissionSms/` + paymentId + '/' + recommenderName + '/' + recommenderNumber + '/' + payerName + '/' + payerUsername + '/' + merchantName, {
            paymentId,
            recommenderName,
            recommenderNumber,
            payerName,
            payerUsername,
            merchantName
          })
          .then(async (response) => {
            //console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
        } catch {
          console.log("Error sending SMS to user whose RVNU code was used.") 
        }
  
    }



  return (

    <FormWrapper>
        <CircularProgressLoad />
    </FormWrapper>

  )
}
