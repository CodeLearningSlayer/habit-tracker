import { Box, Checkbox, Typography, Stack, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit';

const HabitCheckBox = ({ text, handleClick, handleDelete, setHabitCompleted, checkedDef, handleEdit, id}) => {
  const [checked, setChecked] = useState(checkedDef);
  return (
    <Box
      className={checked ? "habit--completed" : "habit--uncompleted"}
      onClick={
        () => {
            setChecked(!checked);
            setHabitCompleted(id, !checked);
            checked ? handleClick(-1) : handleClick(1);
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
          {text}
        </Typography>
        {/* <IconButton sx={{,}}>
          <EditIcon sx={{color:"#AFAFAF"}}/>
        </IconButton> */}
        <IconButton onClick={(e) => {
          handleDelete(id);
          e.stopPropagation();
        }} sx={{ml: "auto", mr: "15px"}}>
          <DeleteIcon sx={{ color:"#AFAFAF"}}/>
        </IconButton>
      </Stack>
    </Box>
  );
};

export default HabitCheckBox;
