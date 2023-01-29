import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FormWrapper from "../rvnu-components/FormWrapper";
import Subtitle from "../rvnu-components/text/Subtitle";
import HelperText from "../rvnu-components/text/HelperText";
import styled from "styled-components";

export default function ErrorScreen({ activeStep, setActiveStep }) {
  return (
    <RvnuContainer>
      <FormWrapper>
        <Subtitle subtitleText={"404. That's an error."}>
          <SentimentVeryDissatisfiedIcon style={{ marginRight: "8px" }} />
        </Subtitle>
        <HelperText text={"The requested URL was not found on this server."} />
      </FormWrapper>
    </RvnuContainer>
  );
}

// Styled Components
const RvnuContainer = styled.section`
  max-width: 100vw;
  min-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
  background: #262626;
  overflow: hidden;
  background: rgba(234, 234, 234, 255);
`;
