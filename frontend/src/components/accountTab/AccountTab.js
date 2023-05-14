import React from "react";
import { Avatar } from "@mui/material";
import img from "../../assets/images/300.gif";
import "./accountTab.scss";

const AccountTab = ({name, timeOfTheDay}) => {
  return (
    <div className="profile-tab">
      <Avatar sx={{width: 44, height: 44}} className="profile-tab__avatar" src={img} alt="my-avatar" />
      <p className="profile-tab__greetings">
      {timeOfTheDay} <br/> <span className="profile-tab__name">{name}</span>
      </p>
    </div>
  );
};

export default AccountTab;
