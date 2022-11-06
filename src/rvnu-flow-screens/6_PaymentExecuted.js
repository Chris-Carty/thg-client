import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@material-ui/core/IconButton';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/Subtitle'
import HelperText from '../rvnu-components/HelperText'
import CountdownTimer from '../rvnu-components/CountdownTimer';
import clearStorage from '../utils/clearStorage';
import Socials from '../rvnu-components/Socials';
import api from '../utils/api'

export default function PaymentExecuted({merchantSaleInfo}) {

    // Get Payer AccountID to link to transaction. 
    const payerAccount = JSON.parse(localStorage.getItem('payerRvnuAccount'))
    const username = payerAccount.Username
    // Get paymentID
    const paymentID = localStorage.getItem("paymentID")

    // Set RvnuCode Vars
    const [expiryTimestamp, setExpiryTimestamp] = useState('')

    // Set Merchant info vars (coming from RvnuBase.js)
    const merchantName = merchantSaleInfo.merchantName
    const redirectURL = merchantSaleInfo.redirectURL

    // Check if user needs a new RVNU code
    useEffect(() => {
        checkIfNeedsRvnuCode()
    }, []);

    // Copy Username to clipboard
    const copyText = () => {
        navigator.clipboard.writeText(username)
    }


    //Redirect back to merchant
    // TODO MAKE PROPER PAYMENT ID APPENDED
    const merchantRedirect = async () => {
        clearStorage()
        window.open(`${redirectURL}/?payment_id=${paymentID}`, '_self')
    }

    // Get Timestamp of RVNU code expiry date for countdown timer 
    const getTimestamp = (input) => {
        const datePart = input.match(/\d+/g)
        const year = datePart[0] // .substring(2) --> get only two digits
        const month = datePart[1]
        const day = datePart[2]
        const dateStrA = year+'-'+month+'-'+day
        const date = new Date(dateStrA);
        //console.log(date); // Wed Jun 22 2022
        const timestampInMs = date.getTime();
        setExpiryTimestamp(timestampInMs)
    
      }

    // Obtain the users RVNUcode
    const getUserRvnuExpiry = async (rvnuCodeId) => {

        try{
        api
        .get(`/rvnu/getUserRvnuExpiry/` + rvnuCodeId, {
            rvnuCodeId,
        })
        .then(async (response) => {
            const result = response.data.data[0]
            const date_str = result.Expiry
            const expiry = date_str.substring(0, 19);
            getTimestamp(expiry)
    
            //sendRvnuCodeSms(result.RvnuCode, fromatExpiry(expiry) )
        })
        .catch((error) => {
            console.log(error)
    
        })
        } catch {
        console.log("error: getting RVNU code")
        }
    } 

    // Check from DB whether to issue new RVNUcode or get exisitng code.
    const checkIfNeedsRvnuCode = async () => {
        const rvnuCodeId = payerAccount.RvnuCodeID
        // If the user does not have a RVNUcode, rvnuCodeId equals 'NULL'
        if (rvnuCodeId !== null) {
            getUserRvnuExpiry(rvnuCodeId)
        } else {
            // Generate new RVNU code and assign to user
            //generateRvnuCode()
        }
    }
    

  return (

    <FormWrapper>
        <CopyWrapper>
            <Subtitle>
            Your username: 
            </Subtitle>
            <Highlighted>
                {username}
                <IconButton
                size='small'
                onClick={() => copyText()}
                >
                <ContentCopyIcon  size='small' color='black'/>
                </IconButton>
            </Highlighted>
            <Subtitle>
                is valid for a further:
            </Subtitle>
            <Highlighted>
                <CountdownTimer countdownTimestampMs={expiryTimestamp}/>
            </Highlighted>
            <Subtitle>
            Share and start earning 
                <span role='img' aria-label='flying-money'>💸</span> 
            </Subtitle>
            <Socials />
            <ExternalLink onClick={() => merchantRedirect()}>
                Return to {merchantName}
            </ExternalLink>
        </CopyWrapper>
    </FormWrapper>

  )
}

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
`

const Highlighted = styled.div`
  font-weight: 700;
  background: rgba(234,234,234,255);
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  border: 0.5px solid lightgrey;
  margin-bottom: 20px;
`

const ExternalLink = styled.a`
  font-size: 16px;
  margin: 40px;
  text-decoration: underline;
  cursor: pointer;
  color: grey;
  &:hover {
    color: black;
  }
`