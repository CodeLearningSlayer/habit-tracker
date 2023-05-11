import React from 'react';
import { Typography } from '@mui/material';
const Greetings = ({day, date}) => {
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
              <Typography
                display="inline"
                variant={"h5"}
                sx={{ fontWeight: 700, color: "#F84343" }}
              >
                Maxim
              </Typography>
            </Typography>
          </div>
    );
};

export default Greetings;