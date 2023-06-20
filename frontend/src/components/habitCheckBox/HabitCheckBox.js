import { Box, Checkbox, Typography, Stack, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit';
import { deleteHabit } from "../../store/slices/habitsSlice";
import { useDispatch } from "react-redux";

const HabitCheckBox = ({ modalMode, habit, handleClick, handleDelete, setHabitCompleted, handleEdit}) => {
  const [checked, setChecked] = useState(habit.isCompleted);
  const dispatch = useDispatch();
  // console.log("рисую новый элемент");
  return (
    <Box
      className={checked ? "habit--completed" : "habit--uncompleted"}
      onClick={
        () => {
            setChecked(!checked);
            dispatch(setHabitCompleted({id: habit._id, isCompleted: !checked}));
        }}
      width={"100%"}
      sx={{
        background: "#232323",
        borderRadius: "29px",
        p: 1,
        mb: 2,
        cursor: "pointer",
        color: "#fff"
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox
          checked={checked}
          size="medium"
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 48 },
            "& .MuiSvgIcon-root path": {
              fill: "red",
            },
          }}
        ></Checkbox>
        <Typography
          sx={{
            color: "#fff",
            fontFamily: "Raleway, sans-serif",
            fontSize: "25px",
            fontWeight: 700,
          }}
        >
          {habit.name}
        </Typography>
        <IconButton sx={{ml: "auto",}} onClick={(e)=> {
          handleEdit(habit);
          e.stopPropagation();
        }}>
          <EditIcon sx={{color:"#AFAFAF"}}/>
        </IconButton>
        <IconButton onClick={(e) => {
          dispatch(deleteHabit({id: habit._id, isCompleted: habit.isCompleted}))
          e.stopPropagation();
        }} sx={{ mr: "15px"}}>
          <DeleteIcon sx={{ color:"#AFAFAF"}}/>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default HabitCheckBox;
