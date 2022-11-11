import React from 'react'
import styled from 'styled-components'

export default function SaleInfoHeader({merchantSaleInfo}) {

  return (
    <HeaderWindow>
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
  max-width: 600px;
  min-width: 600px;
  max-height: 82px;
  min-height: 82px;
  overflow: hidden;
  box-sizing:border-box;
  border-radius: 4px;
  margin-top: 55px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 100%;
    max-height: 10vh;
    min-height: 10vh;
    padding: 0px;
    overflow-x: hidden !important;
    overflow-y: hidden  !important;
    background: rgba(255,255,255,255);
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

  @media (max-width: 480px) {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: center;
  }
`
const Merchant = styled.section`
  font-size: 14px;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`

const Amount = styled.section`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 17px;

  @media (max-width: 480px) {
    margin-left: 0;
  }
`

const Text = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  margin:0;
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

