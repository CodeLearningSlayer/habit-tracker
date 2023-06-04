import { Typography } from '@mui/material';
import React from 'react';
import Calendar from '../calendar/Calendar';
import ProgressBoard from '../progressBoard/ProgressBoard';
import CustomCalendar from '../customCalendar/CustomCalendar';

const InfoBox = ({percentage, numOfCompletedHabits, totalNumOfHabits}) => {
    return (
        <div className="info-box">
            <Typography
              variant="h5"
              sx={{
                letterSpacing: 0.5,
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 300,
                color: "#fff",
                mb: "15px",
              }}
            >
              Current streak
            </Typography>
            <div className="info-box__inner">
              <Calendar />
              <ProgressBoard
                percentage={percentage}
                numOfCompletedHabits={numOfCompletedHabits}
                totalNumOfHabits={totalNumOfHabits}
              />
            </div>
          </div>
    );
};

export default InfoBox;