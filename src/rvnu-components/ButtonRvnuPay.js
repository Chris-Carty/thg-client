import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import BoltIcon from "@mui/icons-material/Bolt";
import RvnuLogo from "../rvnu-assets/RVNU-white.png";

export default function ButtonRvnuPay({ buttonText, loading, ...props }) {
  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
      fontFamily: ["DM Sans"].join(","),
      fontSize: 16,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        id="verify"
        style={{
          borderRadius: 4,
          backgroundColor: "#000000",
          marginTop: "20px",
        }}
        variant="contained"
        {...props}
      >
        {loading ? (
          <CircularProgress size={"28px"} style={{ color: "white" }} />
        ) : (
          <PayByBankWrap>
            <InstantBankTextWrap>
              <Text>Pay now with</Text>
              <HeadlineWrap>
                <BoltIcon sx={{ height: 20 }} />
                <img src={RvnuLogo} alt="RVNU Logo" height="12" />
              </HeadlineWrap>
            </InstantBankTextWrap>
          </PayByBankWrap>
        )}
      </Button>
    </ThemeProvider>
  );
}

// Styled comononets
const PayByBankWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #000000;
  border-radius: 5px;
  padding: 0px;
  margin: 0px;
  background: black;
  cursor: pointer;
`;

const InstantBankTextWrap = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

const HeadlineWrap = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 4px;
`;

const Text = styled.p`
  color: white;
  padding: 0px;
  margin: 0px;
`;
