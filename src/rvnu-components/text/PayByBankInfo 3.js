import React from "react";
import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PayByBankInfo({ infoText }) {
  return (
    <InfoWrap>
      <CheckCircleIcon />
      <Text>{infoText}</Text>
    </InfoWrap>
  );
}

const InfoWrap = styled.section`
  display: flex;
  align-items: center;
  margin: 5px 0 0 0;
`;

const Text = styled.p`
  font-size: 14px;
  margin-left: 20px;
  margin: 5px 0px 5px 20px;
`;
