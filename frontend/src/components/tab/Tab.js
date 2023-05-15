import React from 'react';
import "./tab.scss";
import { Link } from 'react-router-dom';

const Tab = ({icon, name, isActive, handleClick, num, tabHandle, link}) => {
    return (
        <Link to={link}>
            <div onClick={name !== "logout" ? () => handleClick(num) : handleClick} className={`tab ${isActive? "tab--active" : ""}`}>
                <div className='tab__icon' style={{backgroundImage: `url(${icon})`}}></div>
                <p className='tab__name'>{name}</p>
            </div>
        </Link>
        
    );
};

export default Tab;