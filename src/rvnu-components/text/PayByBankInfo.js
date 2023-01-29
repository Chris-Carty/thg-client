import React from "react";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
        <Text>We accept all major UK banks</Text>
      </BulletWrap>
    </InfoWrap>
  );
}

const InfoWrap = styled.section`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 30px 0px;
`;

const BulletWrap = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 14px;
  margin: 0px 0px 0px 15px;
`;
