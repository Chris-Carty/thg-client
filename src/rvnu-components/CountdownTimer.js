import React, {useState, useEffect} from 'react';
import {getRemainingTimeUntilMsTimestamp} from '../utils/CountdownTimerHelper';
import styled from 'styled-components'

const defaultRemainingTime = {
    //seconds: '00',
    //minutes: '00',
    //hours: '00',
    days: ''
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <CountdownWrapper>
            <Span>{remainingTime.days} days</Span>
            {/* <Span>{remainingTime.hours} hours</Span> */}
            {/* <Span>{remainingTime.minutes} m</Span> */}
            {/* <Span>{remainingTime.seconds} s</Span> */}
        </CountdownWrapper>
    );
}

export default CountdownTimer;

// Styled components
const Span = styled.span`
    margin-right: 3px;
`

const CountdownWrapper = styled.div`
    display: flex;
    flex-direction: row;
`