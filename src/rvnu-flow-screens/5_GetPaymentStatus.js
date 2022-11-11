import React from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/Subtitle'
import HelperText from '../rvnu-components/HelperText'
import api from '../utils/api'
import CircularProgressLoad from '../rvnu-components/CircularProgress';


export default function GetPaymentStatus({activeStep, setActiveStep, merchantSaleInfo}) {

    // Set AccountID of recommender Username used to checkout (from local storage)
    const accountId = localStorage.getItem("recommenderID")

    // Get Payer AccountID to link to transaction. 
    const payerAccount = JSON.parse(localStorage.getItem('payerRvnuAccount'))
    const payerFirstName = payerAccount.FirstName

    // Extract paymentId from callback
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paymentId = urlParams.get('payment_id')

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
                setActiveStep(activeStep + 1)
                //getRecommenderAccount()
            } else if (paymentStatus === "failed") {
                setActiveStep(activeStep + 2)
            } else {
                // Call until terminal status is found
                setTimeout(getPaymentStatus, "3000") 
            }
    
            })
            .catch((error) => {
              console.log(error)
            })
        } catch {
            console.log("Error: could not retrieve payment status")
        }
    }


    /*

    const getRecommenderAccount = async () => {
        // Get account info of user whose RVNU code is used 
        try{
          api
          .get(`/user/recommender/account/` + accountId, {
            accountId,
          })
          .then(async (response) => {
            // User whose Username was entered as recommender
            const recommender = response.data[0]
            const firstName = recommender.FirstName
            const lastName = recommender.LastName
            const mobileNumber = recommender.MobileNumber
            const email = recommender.Email
            // Execute functions
            //sendRvnuCodeUsedSms(firstName, mobileNumber, email, codeUsedBy, rvnuCodeId, paymentId)

            //updateTotalAssets(accountId, paymentId)
  
          })
          .catch((error) => {
            console.log(error)
          })
        } catch {
          console.log("Error: unable to get user whose RVNUcode has been used.")
        }
  
    }

    const sendRvnuCodeUsedSms = async (firstName, mobileNumber, email, codeUsedBy, rvnuCodeId, paymentId) => {

        const merchantName = merchantSaleInfo.merchantName
  
        // Send SMS to user whose RVNU code has been used
        try{
          api
          .post(`/verify/commissionSms/` + paymentId + '/' + rvnuCodeId + '/' + firstName + '/' + mobileNumber + '/' + email + '/' + codeUsedBy + '/' + merchantName, {
            paymentId,
            firstName,
            mobileNumber,
            email,
            codeUsedBy,
            merchantName
          })
          .then(async (response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
        } catch {
          console.log("Error sending SMS to user whose RVNU code was used.") 
        }
  
    }

    */


  return (

    <FormWrapper>
      <Subtitle subtitleText={"Payment Successfully Initiated"} >
        <AssuredWorkloadIcon margin-right={10}/>
      </Subtitle>
      <HelperText text={"Please wait while we get the payment status."} />
      <CircularProgressLoad />
    </FormWrapper>

  )
}
