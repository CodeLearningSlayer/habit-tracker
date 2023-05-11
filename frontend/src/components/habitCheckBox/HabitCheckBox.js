import { Box, Checkbox, Typography, Stack } from "@mui/material";
import React, { useState } from "react";

const HabitCheckBox = ({ text, handleClick}) => {
  const [checked, setChecked] = useState(false);
  return (
    <Box
      className={checked ? "habit--completed" : "habit--uncompleted"}
      onClick={
        () => {
            setChecked(!checked);
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
      </Stack>
    </Box>
  );
};

export default HabitCheckBox;
