import React from "react";
import "./habitList.scss";
import { Box, Stack, Chip, Button, Typography } from "@mui/material";
import HabitCheckBox from "../habitCheckBox/HabitCheckBox";

const HabitList = ({ handleFilterClick, onButtonClick, habits, handleDelete, numOfHabits, handleHabitClick, filters, selectedFilter }) => {
  console.log(filters);
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
                  mr: `15px`,
                  color: "#fff",
                  textTransform: "uppercase",
                  fontSize: "20px",
                  borderColor: "#F84343",
                }}
                onClick={() => {
                  handleFilterClick('all');
                }
               }
                label="All"
                variant={selectedFilter === 'all' ? "outlined" : "filled"}
              />
            {filters.map((filter, index) => {
              let mr;
              let variant;
              console.log(filter)
              index !== filters.length - 1 ? mr = 15 : mr = 30;
              selectedFilter === filter ? variant = "outlined" : variant = "filled";
              return(
                <Chip key={index}
                sx={{
                  borderRadius: "10px",
                  mr: `${mr}px`,
                  color: "#fff",
                  textTransform: "uppercase",
                  fontSize: "20px",
                  borderColor: "#F84343",
                }}
                onClick={() => {
                  console.log(filter);
                  handleFilterClick(filter);
                }
               }
                label={filter}
                variant={variant}
              />
              )
            })}
            
            <Button
              onClick={() => onButtonClick(true)}
              variant={"outlined"}
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
          {habits.length && habits.map((habit) => 
          <HabitCheckBox key={habit._id} 
          handleClick={handleHabitClick} 
          text={habit.name}
          id={habit._id}
          handleDelete={handleDelete}/>)}
          
        </Stack>
      </Box>
    </>
  );
};

export default HabitList;
