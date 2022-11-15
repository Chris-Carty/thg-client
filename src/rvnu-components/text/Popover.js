import React, {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import styled from 'styled-components'

export default function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <PopoverWrapper>
      <InfoIcon style={{ color: '#a45dfc' }}  />
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ p: 2, color: '#a45dfc', fontSize: 14, fontFamily: 'DM Sans' }}
      >
        About connecting to my bank
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: -67,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, backgroundColor: '#e6e6e6', fontSize: 16, fontFamily: 'DM Sans'}}>1. We will redirect you to your online banking app or website</Typography>
        <Typography sx={{ p: 1, backgroundColor: '#e6e6e6', fontSize: 16, fontFamily: 'DM Sans'}}>2. Log in to your online banking and authorise the payment</Typography>
      </Popover>
    </PopoverWrapper>
  );
}

// Styled Components
const PopoverWrapper = styled.section`
  display: flex;
  align-items: center;
`
