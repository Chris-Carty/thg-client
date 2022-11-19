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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 20px;
  font-size: 16px;
  font-weight: 200;
  width: 100%;
  box-sizing:border-box;

`