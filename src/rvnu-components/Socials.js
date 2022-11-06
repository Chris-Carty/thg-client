import React from 'react'
import styled from 'styled-components';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

export default function Socials() {

    // Retrieve users RVNU code account info object from local storage
    const rvnuCode = localStorage.getItem("myRvnuCode")
    // Retireve URL to share
    //const shareURL = localStorage.getItem("shareURL")
    const shareURL = "http://rvnu.world"

    const message = `Hey!\n\nMy RVNUcode is ${rvnuCode}\n\nYou can use this next time you checkout with RVNU!\n`

    return (
        <FormWrapper>
            <ShareButtonWrapper>

                <Divider>
                    <FacebookShareButton url={shareURL} 
                        quote={message} 
                        hashtag={'#RVNU'}
                    >
                        <FacebookIcon size={'30px'} borderRadius={'5px'}/>
                    </FacebookShareButton>
                </Divider>

                <Divider>
                    <TwitterShareButton 
                        url={shareURL} 
                        title={message}
                        hashtags={["RVNU"]}
                    > 
                        <TwitterIcon size={'30px'} borderRadius={'5px'}/>
                    </TwitterShareButton>
                </Divider>

                <Divider>
                    <WhatsappShareButton 
                        url={shareURL} 
                        title={message}
                        separator={" "}
                    > 
                        <WhatsappIcon size={'30px'} borderRadius={'5px'}/>
                    </WhatsappShareButton>
                </Divider>
                
            </ShareButtonWrapper>

        </FormWrapper>
    )
}

// Styled Components
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  flex-grow: 1;
  width: 100%;
  box-sizing:border-box;
`

const ShareButtonWrapper = styled.div`
    display: flex;
`

const Divider = styled.div`
    margin: 0px 5px 0px 5px
`
