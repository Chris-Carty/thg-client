import React from 'react'
import styled from 'styled-components'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

const Wrapper = ({ className, ...props }) => (
    <div className={className}>
      <PhoneInput {...props} />
    </div>
);

const Phone = styled(Wrapper)`
    #phone-input {
        margin: 20px 0px;
        width: 100% !important;
        font-size: 17px;
        color: black !important;
        font-family: 'DM Sans' !important;
        border: 1.5px solid rgba(0,0,0,0.9) !important;
        {/*border-bottom: 2px solid black !important;
        border-left: none !important;
        border-right: none !important;
        border-top: none !important;
        border-radius: 0px !important;*/}
        outline: none !important;
        &:focus {
            box-shadow: 0px 0px 0px;
        }
    }
`;

export default function PhoneInputCustom({...props }) {

    return (
        <Phone
        autoFormat={false}
        placeholder={'Enter mobile number'}
        disableCountryCode={false}
        enableSearch={true}
        countryCodeEditable={false}
        inputProps={{
              id: "phone-input",
              autoFocus: true,
            }}  
        country={'gb'}
        regions={'europe'}
        //onlyCountries={['gb']}
        //disableDropdown={true}
        {...props}
      />
    )
}

