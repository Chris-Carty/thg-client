// DROPDOWN LIST OF TRUELAYER BANKING PROVIDERS FOR USER TO SELECT
import React, { useState, useEffect }from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../utils/api'

export default function SelectBank({providerId, setProviderId}) {

    // Hooks for Autocomplete MUI component
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    // Fetch list of providers from TrueLayer API
    const getProviders = async () => {

        try{
          api
          .post(`/providers/getProviders`)
          .then(async (response) => {
            const result = response.data
            formatProviders(result)   
          })
          .catch((error) => {
            console.log(error)
          })
        } catch {
          console.log('error')
  
        }
    }
  
    // Format Repsonse from TrueLayer API
    const formatProviders = (providersArr) => {
        
        // Clean to remove unnecessary provider data
        providersArr.forEach(object => {
          delete object['provider_scope_mappings'];
          delete object['scopes']
        });
  
        // Set the array of provder objects to the options for dropwdown list
        setOptions(providersArr)
    }

    useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        if (active) {
          getProviders()
        }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);

    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    return (
      <Autocomplete
        id="asynchronous-demo"
        disablePortal={true}
        style={{
        background: "white"
        }}
        value={providerId}
        onChange={(event, newValue) => {
          setProviderId(newValue.provider_id);
        }}
        sx={{ width: '100%' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.display_name === value.display_name}
        getOptionLabel={(option) => option.display_name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for your bank"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    )
}
