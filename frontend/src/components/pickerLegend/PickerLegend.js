import React from 'react';

const PickerLegend = () => {
    return (
        <div className="picker-legend">
            <p className="picker-legend__item picker-legend__item--all">
              All habits completed
            </p>
            <p className="picker-legend__item picker-legend__item--some">
              Some habits completed
            </p>
        </div>
    );
};

export default PickerLegend;