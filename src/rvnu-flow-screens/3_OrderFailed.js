import React from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@material-ui/core/IconButton';

export default function ChangeAccount() {

  const firstname = localStorage.getItem("Firstname")
  const username = localStorage.getItem("Username")


  // Copy Username to clipboard
  const copyText = () => {
        navigator.clipboard.writeText(`@${username}`)
  }

  return (
    <FormWrapper>
      <Subtitle subtitleText={"Success"} >
          <CheckCircleIcon margin-right={10}/>
      </Subtitle>

      <Username>
          <Text>
            @{username}
          </Text>
          <IconButton
          size='small'
          onClick={() => copyText()}
          >
          <ContentCopyIcon size='small' color='black'/>
          </IconButton>
      </Username>
  
      <HelperText text={`Welcome to RVNU ${firstname}, your account has been created successfully.`} />

      <HelperText text={`Share your username and start earning now \u{1F911}`} />

      <HelperText text={`Remember to choose 'pay with RVNU' when you pay at your favourite shops and venues.`} />

  </FormWrapper>
  )
}

const Text = styled.p`
  font-weight: bold;
  font-size: 30px;
  margin: 0px 10px 0px 0px;
`

const Username = styled.div`
  display: flex;
  align-items: center;
  background: rgba(234,234,234,255);
  border-radius: 5px;
  padding: 10px 15px 10px 15px;
  border: 0.5px solid lightgrey;
  margin-bottom: 15px;
`