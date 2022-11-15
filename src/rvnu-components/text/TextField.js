import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';

export default function TextFieldUser({...props}) {

  return (
        <TextFieldWrapper>
            <TextField       
            id="custom-css-outlined-input" 
            fullWidth 
            {...props}
            />
        </TextFieldWrapper>
  )
}

const TextFieldWrapper = styled.div`
  margin: 20px 0px;
`
