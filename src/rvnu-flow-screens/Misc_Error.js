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
          <SentimentVeryDissatisfiedIcon />
        </Subtitle>
        <HelperText text={"The requested URL was not found on this server."} />
        <LinksWrapper>
          Please
          <ExternalLink href="https://www.rvnu-dashboard.app/login">
            Login
          </ExternalLink>
          or
          <ExternalLink href="https://www.rvnu-dashboard.app/signup">
            Signup
          </ExternalLink>
        </LinksWrapper>
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

const ExternalLink = styled.a`
  margin: 0px 5px 0px 5px;
  color: black;
  &:hover {
    color: black;
    text-decoration: none;
  }
`;

const LinksWrapper = styled.p`
  margin: 0;
`;
