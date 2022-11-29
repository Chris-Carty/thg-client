import React from 'react'
import styled from 'styled-components'


export default function UsernameInfo({infoText}) {

    return (
        <InfoWrap>
            <Text>
            {infoText}
            </Text>
      </InfoWrap>
    )
  }
  
  const InfoWrap = styled.section`
    margin: 5px 0px 0px 0px;
    padding: 0px;
`

const Text = styled.p`
  font-size: 16px;
  color: black;
`
