import React from "react";
import styledComponent from "styled-components";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export default function TextFieldUser({ ...props }) {
  return (
    <TextFieldWrapper>
      <CssTextField id="custom-css-outlined-input" fullWidth {...props} />
    </TextFieldWrapper>
  );
}

// Styled components
const TextFieldWrapper = styledComponent.div`
  margin: 5px 0px 10px 0px;
`;

// MUI Styled
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "Grey",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderWidth: "1px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      borderWidth: "2px",
    },
  },
});
