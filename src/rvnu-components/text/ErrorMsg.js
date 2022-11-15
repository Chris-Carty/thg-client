import React from 'react'
import styled from 'styled-components'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorMsg({errorText}) {

  return (
    <ErrorWrap>
        <ErrorOutlineIcon  sx={{ m: 0.5 }} fontSize='small' />
        {errorText}
    </ErrorWrap>
  )
}

const ErrorWrap = styled.div`
  display: flex;
  align-items: center;
  color: red;
  margin-top: 20px;
`