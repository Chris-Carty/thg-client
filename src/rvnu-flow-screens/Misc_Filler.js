import React, {useEffect} from 'react'
import FormWrapper from '../rvnu-components/FormWrapper'
import CircularProgressLoad from '../rvnu-components/CircularProgress';
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'


export default function Filler({activeStep, setActiveStep}) {
  useEffect(() => {

    setTimeout(() => {
        setActiveStep(activeStep + 1)
    }, "3000") 
  
  }, []);

  return (
    <FormWrapper>
        <Subtitle />
        <HelperText />
        <CircularProgressLoad />
    </FormWrapper>

  )
}