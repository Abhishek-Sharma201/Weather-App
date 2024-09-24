import React, { useState } from 'react';
import './Home.css'
import { cloudClear, cloudDbl, cloudRainy } from '@/public/assets/SVG';

const Home = () => {
    const [city, setCity] = useState('Mumbai');
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = '31220df36ed1919c236077b084f981cb';

    const kelvinToCelsius = kelvin => kelvin - 273.15;

    const getWeatherData = async () => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            var svg = '';

            if (data.weather.main === "Rain") svg = cloudRainy;
            if (data.weather.main === "Clouds") svg = cloudDbl;
            if (data.weather.main === "Clear") svg = cloudClear;

            setWeatherData({
                weatherDescription: data.weather[0].description,
                temperatureCelsius: kelvinToCelsius(data.main.temp),
                lon: data.coord.lon,
                lat: data.coord.lat,
                cloud: data.clouds.all,
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                windSpeed: data.wind.speed,
                SVG: svg
            });
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="Home">
            <h1 className="head">WeatherPulse {'>>'}</h1>
            <div className="container">
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    className="searchInp"
                    placeholder="City?"
                    autoComplete="off"
                />
                <button className="change-weather" onClick={getWeatherData}>
                    Get Weather
                </button>
            </div>

            {/* {weatherData && (
                <div className="weather-card">
                    <div className="top">
                        <h3 className="info city">Location: {city}</h3>
                        <h3 className="info weather">Weather: {weatherData.weatherDescription}</h3>
                        <h3 className="info lat">Latitude: {weatherData.lat}</h3>
                        <h3 className="info lon">Longitude: {weatherData.lon}</h3>
                        <h3 className="info temp">Temp: {weatherData.temperatureCelsius.toFixed(2)} °C</h3>
                        <h3 className="info cloud">Clouds: {weatherData.cloud}</h3>
                        <h3 className="info sunrise">Sunrise: {weatherData.sunrise}</h3>
                        <h3 className="info sunset">Sunset: {weatherData.sunset}</h3>
                        <h3 className="info win-speed">Wind Speed: {weatherData.windSpeed}</h3>
                    </div>
                    <h2 className="degree">{weatherData.temperatureCelsius.toFixed(2)} °C</h2>
                </div>
            )} */}
        </div>
    );
};

export default Home;
