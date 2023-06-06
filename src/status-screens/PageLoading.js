import React from 'react'
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';


export default function MiscFiller() {

  return (
        <Wrapper>
           <CircularProgress size={'28px'} style={{'color': 'white'}} />
        </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: black;
  width: 100vw;
  height: 100%;
  box-sizing: border-box; 

`
