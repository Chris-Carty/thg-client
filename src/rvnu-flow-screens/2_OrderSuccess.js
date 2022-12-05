import React from 'react'
import SmsIcon from '@mui/icons-material/Sms';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import FormButton from '../rvnu-components/Button'
//import api from '../utils/api'


export default function OrderSuccess({activeStep, setActiveStep}) {

  return (

    <FormWrapper>
      <Subtitle subtitleText={"Order Successful"} >
        <SmsIcon margin-right={10}/>
      </Subtitle>
      <HelperText text={`Your order number is: 123456.`} />
      <FormButton
      buttonText={"Verify"}
      disabledButtonText={"Verify"}
      //onClick={ () => isValidOtp() }
      >
      </FormButton>
    </FormWrapper>

  )
}
