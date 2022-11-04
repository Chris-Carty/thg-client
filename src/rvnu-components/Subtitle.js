import React from 'react'
import styled from 'styled-components'

export default function Subtitle({subtitleText, subtitleIcon, children}) {

  return (
    <SubtitleWrapper>
        {children}
        <IconWrapper>
            {subtitleIcon}
        </IconWrapper>
        {subtitleText}
    </SubtitleWrapper>
  )
}

const SubtitleWrapper = styled.h3`
  font-size: 20px;
  font-weight: 200;
  margin-top: 0;
  display: flex;
`

const IconWrapper = styled.div`
  margin-right: 10px;
`
