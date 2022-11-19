import React, {useEffect} from 'react'
import FormWrapper from '../rvnu-components/FormWrapper'
import CircularProgressLoad from '../rvnu-components/CircularProgress';


export default function Filler({activeStep, setActiveStep}) {
  useEffect(() => {

    setTimeout(() => {
        setActiveStep(activeStep + 1)
    }, "3000") 
  
  }, []);

  return (
    <FormWrapper>
        <CircularProgressLoad />
    </FormWrapper>

  )
}