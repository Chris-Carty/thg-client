import React from "react";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BankLogos from "../../rvnu-assets/bank-logos.png";

export default function PayByBankInfo() {
  return (
    <InfoWrap>
      <BulletWrap>
        <CheckCircleOutlineIcon style={{ color: "#000", fontSize: 18 }} />
        <Text> One of the most secure ways to pay</Text>
      </BulletWrap>
      <BulletWrap>
        <CheckCircleOutlineIcon style={{ color: "#000", fontSize: 18 }} />
        <Text>
          {" "}
          Hassle-free. Connect to your bank without entering data manually
        </Text>
      </BulletWrap>
      <BulletWrap>
        <CheckCircleOutlineIcon style={{ color: "#000", fontSize: 18 }} />
        <LogoWrap>
          <Text>We accept all major UK banks</Text>
          <BankLogosWrap>
            <img src={BankLogos} alt="Bank Logo" height="25" />
          </BankLogosWrap>
        </LogoWrap>
      </BulletWrap>
    </InfoWrap>
  );
}

const InfoWrap = styled.section`
  display: flex;
  flex-direction: column;
  margin: 30px 0px 30px 0px;

  @media (max-width: 350px) {
    margin: 20px 0px 10px 0px;
  }
`;

const BulletWrap = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoWrap = styled.section`
  display: flex;
  align-items: center;

  @media (max-width: 350px) {
    flex-direction: column;
  }
`;

const Text = styled.p`
  font-size: 14px;
  margin: 0px 0px 0px 15px;
`;

const BankLogosWrap = styled.section`
  display: flex;
  margin: 0px 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 350px) {
    margin: 5px 0px;
  }
`;
