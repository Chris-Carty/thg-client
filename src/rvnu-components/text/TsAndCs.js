import React from 'react'
import styled from 'styled-components'

export default function TsAndCs({...props}) {

  // TODO ADD LINKS TO T&Cs

  const EndUserTerms = <Link href="XXX">End User Terms of Service</Link>

  const PrivacyPolicy = <Link href="XXX">Privacy Policy</Link>

  const CookieUse = <Link href="XXX">Cookie Use</Link>

  return (
    <TersmWrapper>
        <Text>
            By signing up, you agree to the {EndUserTerms} and {PrivacyPolicy}, including {CookieUse}.
        </Text>
    </TersmWrapper>
  )
}

// Styled Components
const TersmWrapper = styled.section`
`

const Text = styled.p`
 font-size: 12px;
 color: grey;
`

const Link = styled.a`
   text-decoration: none;
   color: #a45dfc; 

   :link {
      color: #a45dfc; 
  }

    :visited {
      color: #a45dfc; 
  }
`
