import React from 'react'
import styled from 'styled-components'

export default function TsAndCs({...props}) {

  // TODO ADD LINKS TO T&Cs

  const EndUserTerms = <Link href="XXX">End User Terms of Service</Link>

  const PrivacyPolicy = <Link href="XXX">Privacy Policy</Link>

  return (
    <TersmWrapper>
        <Text>
            By continuing you are permitting RVNU to initiate a payment from your bank account. You also agree to our {EndUserTerms} and {PrivacyPolicy}.
        </Text>
    </TersmWrapper>
  )
}

const TersmWrapper = styled.section`
  text-align: center;
`

const Text = styled.p`
 font-size: 10px;
 color: grey;
`

const Link = styled.a`
   text-decoration: none;

  :visited {
  color: black;
}

`