'use client'
import React from 'react';
import './Forcast.css';

const Forcast = ({ data }) => {
    if (!data) {
        return null;
    }

    const { city, temperatureCelsius, SVG, date } = data;
    const formattedDate = new Date(date).toDateString();

    return (
        <div className="forcastCard">
            <>
                <h3 className="city">{city}</h3>
                <div className="svgContainer">
                    {SVG}
                </div>
                <h3 className="degree">
                    {temperatureCelsius !== undefined
                        ? `${temperatureCelsius.toFixed(2)}°C`
                        : 'N/A'}
                </h3>
                <h3 className="date">{formattedDate}</h3>
            </>
        </div>
    );
}

export default Forcast;
