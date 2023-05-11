import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Typography } from '@mui/material';

const ProgressBoard = ({percentage, numOfCompletedHabits, totalNumOfHabits}) => {
    return (
        <div className='progress-wrapper'>
            <div style={{width: 173, height: 173}} className='info-box__progress'>
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
                textSize: '23px',
                pathColor: `rgba(197, 196, 196, ${0.7})`,
                trailColor: `#303030`,
                textColor: "#fff",
                })}/>
            </div>
            <Typography variant='h4'
            style={{color: "#fff", textAlign: "center", fontSize: "40px"}}>
                <span className='progress-wrapper__text--bold'>{numOfCompletedHabits} of {totalNumOfHabits} habits</span> <br/> 
                completed <br/> today!</Typography>
        </div>
    );
};

export default ProgressBoard;