import React, {useEffect} from 'react'
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/Subtitle'
import HelperText from '../rvnu-components/HelperText'
import LinearProgress from '@mui/material/LinearProgress';


export default function Filler({activeStep, setActiveStep}) {
    
  useEffect(() => {

    setTimeout(() => {
        setActiveStep(activeStep + 1)
    }, "3000") 
  
  }, []);

  return (
    <FormWrapper>
      <Subtitle subtitleText={""} >
      </Subtitle>
      <HelperText text={""} />
      <HelperText text={""} />
      <LinearProgress color="inherit" />
    </FormWrapper>

  )
}
