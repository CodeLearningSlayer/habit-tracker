import React from "react";
import "./habitList.scss";
import { Box, Stack, Chip, Checkbox, Button, Typography } from "@mui/material";
import HabitCheckBox from "../habitCheckBox/HabitCheckBox";

const HabitList = ({ habits, deleteHabit, numOfHabits, handleHabitClick }) => {
  return (
    <>
      <Box>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Rubik, sans-serif",
              mb: 2,
              fontSize: "25px",
            }}
          >
            Habits - {numOfHabits}
          </Typography>
          <Box sx={{mb: "15px"}}>
            <Chip
              sx={{
                borderRadius: "10px",
                mr: "15px",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "20px",
                borderColor: "#F84343",
              }}
              variant="outlined"
              onClick={() => {}}
              label="DAILY"
            />
            <Chip
              sx={{
                borderRadius: "10px",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "20px",
                borderColor: "#F84343",
              }}
              onClick={() => {}}
              label="PRODUCTIVITY"
            />
            <Chip
              sx={{
                borderRadius: "10px",
                ml: "15px",
                mr: "30px",
                color: "#fff",
                textTransform: "uppercase",
                fontSize: "20px",
                borderColor: "#F84343",
              }}
              onClick={() => {}}
              label="SPORTS"
            />
            <Button
              variant="outlined"
              sx={{
                fontSize: 30,
                borderRadius: "50%",
                backgroundColor: "#FF1818",
                color: "#fff",
                border: "2px solid #FFF",
                width: "50px",
                height: "50px",
                minWidth: "unset",
                "&:hover": {
                  border: "2px solid #FFF",
                  backgroundColor: "#FF181877",
                }
              }}
            >
              +
            </Button>
          </Box>
        </Stack>
        <Stack>
          {habits?.map((habit) => <HabitCheckBox key={habit._id} handleClick={handleHabitClick} text={habit.name}/>)}
          
        </Stack>
      </Box>
    </>
  );
};

export default HabitList;
