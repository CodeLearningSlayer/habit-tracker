import React from 'react';
import AccountTab from '../accountTab/AccountTab';
import habitsIcon from "../../assets/icons/habits.svg";
import challenges from "../../assets/icons/challenges.svg";
import achievements from "../../assets/icons/achievements.svg";
import goals from "../../assets/icons/goals.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import Tab from '../tab/Tab';

const SideBar = ({name, timeOfTheDay, logout}) => {
    return (
        <aside className='left-side'>
          <AccountTab name={name} timeOfTheDay={timeOfTheDay}/>
          <div className='side-tabs'>
          <h5 className='areas'>Areas</h5>
            <Tab icon={habitsIcon} name="Habits" isActive={true}/>
            <Tab icon={challenges} name="Challenges"/>
            <Tab icon={achievements} name="Achievements"/>
            <Tab icon={goals} name="Goals"/>
          </div>
          
          <Tab icon={logoutIcon} handleClick={logout} name="Logout"/>
        </aside>
    );
};

export default SideBar;