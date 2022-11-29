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
        margin: 5px 0px;
        width: 100% !important;
        height: 56px;
        font-size: 16px;
        color: black !important;
        font-family: 'DM Sans' !important;
        border: 1px solid grey !important;
        outline: none !important;
        &:focus {
            box-shadow: 0px 0px 0px;
            border: 1px solid rgba(0,0,0,1);
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
              id: "phone-input"
            }}  
        country={'gb'}
        regions={'europe'}
        //onlyCountries={['gb']}
        //disableDropdown={true}
        {...props}
      />
    )
}

