import React from 'react';
import "./tab.scss";

const Tab = ({icon, name, isActive, handleClick}) => {
    return (
        <div onClick={handleClick} className={`tab ${isActive? "tab--active" : ""}`}>
            <div className='tab__icon' style={{backgroundImage: `url(${icon})`}}></div>
            <p className='tab__name'>{name}</p>
        </div>
    );
};

export default Tab;