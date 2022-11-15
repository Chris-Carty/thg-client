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
        clearStorage()
        setTimeout(() => {
            window.open(`${redirectURL}/?$payment_id=${paymentID}`, '_self')
        }, "3000") 
    }, []);

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
