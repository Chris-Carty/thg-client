import React from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function PayByBankInfo({infoText}) {

    return (
        <InfoWrap>
            <CheckCircleIcon sx={{height: 16}}  />
            <Text>
            {infoText}
            </Text>
      </InfoWrap>
    )
  }
  
  const InfoWrap = styled.section`
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
`

const Text = styled.p`
  font-size: 14px;
  margin-left: 20px;
  margin: 0px 0px 0px 10px;
`
