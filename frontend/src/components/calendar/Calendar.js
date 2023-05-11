import React from 'react';
import {DateCalendar, LocalizationProvider, ruRU} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Calendar = () => {
    return (
        <div className='info-box__calendar'>
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DateCalendar showDaysOutsideCurrentMonth readOnly sx={{
                border: "1px solid #FF0505",
                borderRadius: "8px",
                maxWidth: "388px",
                width: "100%",
                margin: 0,
                background: "#423B3B", 
                color: "#F8F8F8", 
                "& .MuiButtonBase-root" : {
                border: "none !important",
                color: "#fff"
                },
                "& .MuiTypography-root" : {
                color: "#bcbcbc"
                },
                }}> </DateCalendar>
            </LocalizationProvider>
        </div>
    );
};

export default Calendar;