import React from 'react'
import styled from 'styled-components'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import clearStorage from '../utils/clearStorage';

export default function SaleInfoHeader({merchantSaleInfo, finalScreen}) {

  // Set Merchant info vars (coming from RvnuBase.js)
  const merchantName = merchantSaleInfo.merchantName
  const redirectURL = merchantSaleInfo.redirectURL
  // Get paymentID
  const paymentID = localStorage.getItem("paymentID")

  const merchantLink = <Link href={`${redirectURL}/?payment_id=${paymentID}`}>{merchantName}</Link>

    //Redirect back to merchant
  const merchantRedirect = async () => {
      clearStorage()
      window.open(`${redirectURL}/?payment_id=${paymentID}`, '_self')
  }

  return (
    <HeaderWindow>
        { finalScreen ? (
          <React.Fragment>
            <CountdownWrapper>
            <Text2>
                  Redirecting to {merchantLink} to see your order confirmation. {/*Automatically redirecting in XXs*/}
            </Text2>
             {/*<CountdownCircleTimer
              size={45}
              onComplete={() => merchantRedirect()}
              strokeWidth={5}
              isPlaying
              duration={5}
              colors={['#000000', '#000000', '#000000', '#000000']}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>*/}
            </CountdownWrapper>
          </React.Fragment>
        ) : (
        <React.Fragment>
          <RvnuLogo>
              <img src={require('../rvnu-assets/RVNU-circle.png')}
                  alt="RVNU Logo" 
                  height="56"
              />
          </RvnuLogo>
          <PaymentInfo>
              <Merchant>
              <Text>
                  You're sending
              </Text>
              <MerchantName>
                  {merchantSaleInfo.merchantName}
              </MerchantName>
              </Merchant>
              <Amount>
                  <TextBold>
                  £ {merchantSaleInfo.amount}
                  </TextBold>
              </Amount>
          </PaymentInfo>
        </React.Fragment>
        ) }
    </HeaderWindow>
  )
}


const HeaderWindow = styled.section`
  font-family: Montserrat, sans-serif;
  letter-spacing: 0.4000000059604645px;
  color: rgb(45, 45, 45);
  display: flex;
  background: rgba(255,255,255,255);
  font-weight: 200;
  max-width: 500px;
  min-width: 500px;
  max-height: 82px;
  min-height: 82px;
  overflow: hidden;
  box-sizing:border-box;
  border-radius: 4px;
  margin-top: 55px;
  margin-bottom: 16px;

  @media (max-width: 500px) {
    max-width: 100%;
    min-width: 100%;
    max-height: 15vh;
    min-height: 10vh;
    padding: 0px;
    overflow-x: hidden !important;
    overflow-y: hidden  !important;
    background: rgba(255,255,255,255);
    margin-top: 0px;
  }
`

const RvnuLogo = styled.section`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 17px;
`

const PaymentInfo = styled.section`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 17px;
  width: 100%;

  @media (max-width: 500px) {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: center;
  }
`
const CountdownWrapper = styled.section`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 20px;
  width: 100%;

  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    margin: 20px;
    flex-direction: column;
    justify-content: center;
  }
`

const Merchant = styled.section`
  font-size: 14px;
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`

const Amount = styled.section`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 17px;

  @media (max-width: 500px) {
    margin-left: 0;
  }
`

const Text = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  margin:0;
`

const Text2 = styled.a`
  font-size: 14px;
  text-align: center;
  line-height: 30px;

  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`

const TextBold = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
  margin:0 0 0 5px;
`

const MerchantName = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  margin:0 0 0 5px;
`

const Link = styled.a`
    font-weight: 700;
   color: #000000; 


   :link {
      color: #000000; 
  }

    :visited {
      color: #000000; 
  }
`


