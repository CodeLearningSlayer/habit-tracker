import React from 'react';
import AccountTab from '../accountTab/AccountTab';
import habitsIcon from "../../assets/icons/habits.svg";
import challenges from "../../assets/icons/challenges.svg";
import achievements from "../../assets/icons/achievements.svg";
import goals from "../../assets/icons/goals.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import Tab from '../tab/Tab';

const SideBar = ({name, timeOfTheDay, logout, activeNum, clickHandle}) => {
    return (
        <aside className='left-side'>
          <AccountTab name={name} timeOfTheDay={timeOfTheDay}/>
          <div className='side-tabs'>
          <h5 className='areas'>Areas</h5>
            <Tab link="/" icon={habitsIcon} name="Habits" isActive={activeNum === 0 ? true : false} num={0} handleClick={clickHandle}/>
            <Tab link="challenges" icon={challenges} isActive={activeNum === 1 ? true : false} num={1} handleClick={clickHandle} name="Challenges"/>
            <Tab link="achievements" icon={achievements} isActive={activeNum === 2 ? true : false} num={2} handleClick={clickHandle} name="Achievements"/>
            <Tab link="goals" icon={goals} isActive={activeNum === 3 ? true : false} num={3} handleClick={clickHandle} name="Goals"/>
          </div>
          
          <Tab icon={logoutIcon} handleClick={logout} name="Logout"/>
        </aside>
    );
};

export default SideBar;