import React, { useEffect } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgressLoad from '../rvnu-components/CircularProgress';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import clearStorage from '../utils/clearStorage';


export default function PaymentFailed({merchantSaleInfo}) {

    const paymentID = localStorage.getItem("paymentID") 
    const redirectURL = merchantSaleInfo.redirectURL
    const merchantName = merchantSaleInfo.merchantName

    useEffect(() => {
        setTimeout(() => {
          merchantRedirect()
        }, "3000") 
    }, []);

    //Redirect back to merchant
    const merchantRedirect = async () => {
        clearStorage()
        window.open(`${redirectURL}/?payment_id=${paymentID}`, '_self')
    }

    // TODO GET REASON FOR PAYMENT FAILURE and appedn to UTL

    return (

      <FormWrapper>
        <Subtitle subtitleText={"Payment Failed"} >
        <ErrorOutlineIcon />
        </Subtitle>
        <HelperText text={`Please wait while we redirect you to ${merchantName}`} />
        <CircularProgressLoad />
      </FormWrapper>

    )
}
