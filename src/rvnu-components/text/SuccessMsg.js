import React from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SuccessMsg({SuccessText}) {

  return (
    <SuccessWrap>
        <CheckCircleIcon  sx={{ m: 0.5 }} fontSize='small' />
        {SuccessText}
    </SuccessWrap>
  )
}

const SuccessWrap = styled.div`
  display: flex;
  align-items: center;
  color: #32CD30;
  margin-top: 20px;
`