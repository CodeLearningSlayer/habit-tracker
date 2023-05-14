import React from 'react';
import { Typography } from '@mui/material';
const Greetings = ({day, date, name}) => {
    return (
        <div className="right-side__top">
            <Typography
              variant={"h4"}
              sx={{
                mt: "25px",
                fontWeight: 700,
                fontFamily: "Nunito, sans-serif",
                color: "#FFF",
              }}
              textAlign={"center"}
              className="date-top"
            >{`${day}, ${date}`}</Typography>
            <Typography
              textAlign="center"
              variant={"h5"}
              sx={{ fontWeight: 600, fontFamily: "Nunito", color: "#fff" }}
            >
              Привет,{" "}
              <span style={{color: "#FF1818", fontWeight: 700, fontFamily: "Nunito"}}>{name}</span>
            </Typography>
          </div>
    );
};

export default Greetings;