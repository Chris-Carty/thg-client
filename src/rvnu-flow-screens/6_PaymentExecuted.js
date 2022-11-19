import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@material-ui/core/IconButton';
import FormWrapper from '../rvnu-components/FormWrapper'
import Subtitle from '../rvnu-components/text/Subtitle'
import HelperText from '../rvnu-components/text/HelperText'
import CountdownTimer from '../rvnu-components/CountdownTimer';
import clearStorage from '../utils/clearStorage';
//import Socials from '../rvnu-components/Socials';
import api from '../utils/api'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function PaymentExecuted({merchantSaleInfo}) {

    // Get Payer AccountID to link to transaction. 
    const payerAccount = JSON.parse(localStorage.getItem('payerRvnuAccount'))
    const username = payerAccount.Username
    const accountId = payerAccount.AccountID
    // Get paymentID
    const paymentID = localStorage.getItem("paymentID")
    // Set Merchant info vars (coming from RvnuBase.js)
    const redirectURL = merchantSaleInfo.redirectURL
    // Set timestamp of RVNU code expiry
    const [expiryTimestamp, setExpiryTimestamp] = useState('')
    // Set timestamp of RVNU code expiry
    const [newRvnuExpiry, setNewRvnuExpiry] = useState(false)

    // Check if user needs a new RVNU code
    useEffect(() => {
        checkIfNeedsRvnuCode()
    }, []);

    // Copy Username to clipboard
    const copyText = () => {
        navigator.clipboard.writeText(username)
    }

    // Fucntions to update localStorage items
    const setObject = (key, obj) => {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    const getObject = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    const updateItem = (key, property, value) => {
        var obj = getObject(key);
        obj[property] = value;    
        setObject(key, obj);
    }

    //Redirect back to merchant
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

    // Obtain the users RVNU code expiry
    const getPayerRvnuExpiry = async (rvnuCodeId) => {

        try{
        api
        .get(`/rvnu/getPayerRvnuExpiry/` + rvnuCodeId, {
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

    const generateRvnuCode = async () => {
         
        try{
          api
          .post(`/rvnu/generate/` + accountId, {
            accountId,
          })
          .then(async (response) => {
            // Get new RVNU code && update account info local storage
            const NewRvnuCodeId = response.data
            updateItem('payerRvnuAccount', 'RvnuCodeID', NewRvnuCodeId)
            setNewRvnuExpiry(true)

          })
          .catch((error) => {
            console.log(error)
  
          })
        } catch {
          console.log("error: generating RVNU code")
        }
    }

    // Check from DB whether to issue a new RVNU code to the payer
    // or establish if they already have a valid code.
    const checkIfNeedsRvnuCode = async () => {

        const rvnuCodeId = payerAccount.RvnuCodeID
        // If the user does not have a RVNUcode, rvnuCodeId equals 'NULL'
        if (rvnuCodeId === null || rvnuCodeId === "null" || rvnuCodeId === "" ) {
             // Generate new RVNU code and assign to user
             generateRvnuCode()
        } else {
            // Get expiry date of existing RVNU code if they already have
            getPayerRvnuExpiry(rvnuCodeId)
        }
    }
    

  return (

    <FormWrapper>
        <CopyWrapper>
            <Subtitle subtitleText={" Payment Successful"} >
            <CheckCircleIcon margin-right={10} />
            </Subtitle>
            <HelperText text={"Your username"} />
            <Username>
                {username}
                <IconButton
                size='small'
                onClick={() => copyText()}
                >
                <ContentCopyIcon size='small' color='black'/>
                </IconButton>
            </Username>
            <HelperText text={"is valid for"} />
            <DaysCountdown>
            { newRvnuExpiry ? (
                    "14 days"
                 ) : (
                    <CountdownTimer countdownTimestampMs={expiryTimestamp}/>
                )}
            </DaysCountdown>
            {/*<Socials />*/}
            <Text1>
                 Share and start earning now.
            </Text1>
        </CopyWrapper> 
    </FormWrapper>
  )
}

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`

const Username = styled.div`
  font-weight: 700;
  background: rgba(234,234,234,255);
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  border: 0.5px solid lightgrey;
  margin-bottom: 15px;
`

const DaysCountdown = styled.div`
  font-weight: 700;
  background: rgba(234,234,234,255);
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  border: 0.5px solid lightgrey;
  margin-bottom: 0px;
`

const Text1 = styled.a`
  margin-top: 40px;
  font-size: 16px;
  color: #a45dfc;
  text-align: center;
`
