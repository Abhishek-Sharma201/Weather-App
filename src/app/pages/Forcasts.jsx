import React from 'react';
import './Forcasts.css'
import Forcast from '../components/Forcast';

const Forcasts = ({ forecastData }) => {
    if (!forecastData || forecastData.length === 0) {
        return <p>No forecast data available</p>;
    }

    return (
        <div className="forcasts">
            <h1>Forcasts {'>>'}</h1>
            <div className="container">
                {forecastData.map((data, index) => (
                    <Forcast key={index} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Forcasts;
