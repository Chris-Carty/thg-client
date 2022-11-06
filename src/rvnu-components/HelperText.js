import React from 'react'
import styled from 'styled-components'

export default function HelperText({text}) {

  return (
     <Text>
        {text}
     </Text>
  )
}

const Text = styled.p`
  font-size: 17px;
  margin-top: 10px;
`