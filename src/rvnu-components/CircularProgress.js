import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularProgressLoad({ ...props }) {
  return (
    <CircularProgressWrapper>
      <CircularProgress color="inherit" />
    </CircularProgressWrapper>
  );
}

const CircularProgressWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px !important;
`;
