import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styledComponent from 'styled-components'
import {generateArrayOfYears, generateArrayOfMonths, getMonthNumber} from '../utils/arrays';


export default function DateOfBirth({...props}) {

    // ARRAYS FOR DOB SELECT
    // Years Menu Items
    const yearsArr = generateArrayOfYears();

    const yearsMenuItems = yearsArr.map(item => (
        <MenuItem value={item}>{item}</MenuItem>
      ));
    // Days Menu Items
    const daysArr = Array.from({length: 31}, (_, i) => i + 1)
    //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10... 31]
    const daysMenuItems = daysArr.map(item => (
        <MenuItem value={item}>{item}</MenuItem>
      ));
    // Month Menu Items
    const monthsArr = generateArrayOfMonths()
    const monthsMenuItems = monthsArr.map(item => (
        <MenuItem value={item}>{item}</MenuItem>
      ));


    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    const handleMonth = (month) => {
        setMonth(month)
        const month_num = getMonthNumber(month) 
        localStorage.setItem("dob-month", String(month_num))
    }

    const handleDay = (day) => {
        setDay(day)
        localStorage.setItem("dob-day", String(day))
    }

    const handleYear = (year) => {
        setYear(year)
        localStorage.setItem("dob-year", String(year))
    }

    return (
        <Wrapper>

            <Month>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        label="Month"
                        onChange={(e) => handleMonth(e.target.value)}
                    >
                     {monthsMenuItems}
                    </Select>
                </FormControl>
            </Month>
                
            <Day>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Day</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={day}
                        label="Day"
                        onChange={(e) => handleDay(e.target.value)}
                    >
                        {daysMenuItems}
                    </Select>
                </FormControl>
            </Day>

            <Year>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Year"
                        onChange={(e) => handleYear(e.target.value)}
                    >
                        {yearsMenuItems}
                    </Select>
                </FormControl>
            </Year>
        </Wrapper>
        
    );
}

const Wrapper = styledComponent.div`
  display: flex;
`

const Month = styledComponent.div`
  flex-grow: 3;
  margin-right: 11px;
`

const Day = styledComponent.div`
  flex-grow: 1;
  margin-right: 11px;
`

const Year = styledComponent.div`
  flex-grow: 2;
`