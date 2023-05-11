import React from 'react';
import {
    usePickerLayout,
    PickersLayoutRoot,
    pickersLayoutClasses,
    PickersLayoutContentWrapper,
  } from '@mui/x-date-pickers/PickersLayout';
import "./customCalendar.scss";
import { Typography } from '@mui/material';

function CustomCalendar (props) {
    const {toolbar, tabs, content, actionBar} = usePickerLayout(props)
    return (
        <PickersLayoutRoot className={pickersLayoutClasses.root} ownerState={props}>
          {toolbar}
          {actionBar}
          <PickersLayoutContentWrapper className={pickersLayoutClasses.contentWrapper}>
            {tabs}
            {content}
          </PickersLayoutContentWrapper>
          
        </PickersLayoutRoot>
      );
};

export default CustomCalendar;