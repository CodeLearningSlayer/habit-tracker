import React, { useState } from "react";
import "./habitList.scss";
import { Box, Stack, Chip, Button, Typography, Divider, LinearProgress } from "@mui/material";
import HabitCheckBox from "../habitCheckBox/HabitCheckBox";
import useFetch from "../../hooks/useFetch";

const setContent = (process, newItemLoading) => {
  switch (process){
      case 'waiting':
          return <LinearProgress color="primary" sx={{
            height:"5px", 
            borderRadius: "2px", 
            mb: "20px",
            ".MuiLinearProgress-bar": {backgroundColor: "red"},
            backgroundColor: "#8b0000"
            }} />
      case 'loading':
          return newItemLoading ? <Divider sx={{borderWidth:"3px", 
          borderRadius: "2px", 
          borderColor: "#423B3B",
          mb: "20px"}}/> :<LinearProgress color="primary" sx={{
            height:"5px", 
            borderRadius: "2px", 
            mb: "20px",
            ".MuiLinearProgress-bar": {backgroundColor: "red"},
            backgroundColor: "#8b0000"
            }} />;
      case 'confirmed':
          return <Divider sx={{borderWidth:"3px", 
          borderRadius: "2px", 
          borderColor: "#423B3B",
          mb: "20px"}}/>
      case 'error':
          return new Error();
      default:
          throw new Error('unexpected proccess state');
  }
} 


const HabitList = ({ mode, handleFilterClick, onButtonClick, habits, handleDelete, numOfHabits, handleHabitClick, filters, selectedFilter, handleEdit, setHabitCompleted }) => {
  const [habitsLoading, setHabitsLoading] = useState(false);
  const {process} = useFetch();
  console.log(filters);
  console.log("рисую список");
  return (
    <>
      <Box>
        <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff", fontFamily: "Rubik, sans-serif", mb: 2, fontSize: "25px"}}>
            Habits - {numOfHabits}
          </Typography>
          <Box sx={{mb: "15px"}}>
          <Chip
                sx={{ borderRadius: "10px", mr: `15px`, color: "#fff", textTransform: "uppercase", fontSize: "20px", borderColor: "#F84343"}}
                onClick={() => {
                  handleFilterClick('all');
                }
               }
                label="All"
                variant={selectedFilter === 'all' ? "outlined" : "filled"}
              />
            {filters && filters.map((filter, index) => {
              let mr;
              let variant;
              index !== filters.length - 1 ? mr = 15 : mr = 30;
              selectedFilter === filter ? variant = "outlined" : variant = "filled";
              return(
                <Chip key={index}
                sx={{ borderRadius: "10px", mr: `${mr}px`, color: "#fff", textTransform: "uppercase", fontSize: "20px", borderColor: "#F84343",
                }}
                onClick={() => {
                  handleFilterClick(filter);
                }
               }
                label={filter}
                variant={variant}
              />
              )
            })}
            
            <Button
              onClick={() => {
                mode.current = "creating";
                onButtonClick(true);
              }}
              variant={"outlined"}
              sx={{ fontSize: 30, borderRadius: "50%", backgroundColor: "#FF1818", color: "#fff", border: "2px solid #FFF", width: "50px", height: "50px", minWidth: "unset",
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
        
        {setContent(process, habitsLoading)}

        <Stack>
          {habits && habits.length && habits.map((habit) => 
          <HabitCheckBox key={habit._id} 
            habit={habit}
            setHabitCompleted={setHabitCompleted} 
            handleEdit={handleEdit}
            handleDelete={handleDelete}/>)}
          
        </Stack>
      </Box>
    </>
  );
};

export default HabitList;
