import React from 'react'
import styled from 'styled-components'

export default function FormWrapper({children}) {

  return (
     <Wrapper>
        {children}
     </Wrapper>
  )
}

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(234,234,234,255);
  padding: 20px;
  font-size: 16px;
  font-weight: 200;
  flex-grow: 1;
  width: 100%;
  box-sizing:border-box;
  &:nth-child(4) {
  margin-top: auto !important;
  }
`