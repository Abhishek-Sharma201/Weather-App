import React, { useState, useEffect } from 'react';
import './Home.css';
import { cloudClear, cloudDbl, cloudHaze, cloudRainy, cloudSnow, cloudSun, cloudThunder } from '../../../public/assets/SVG';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Forcasts from './Forcasts';

const Home = () => {
    const [city, setCity] = useState('Mumbai');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const apiKey = '31220df36ed1919c236077b084f981cb';

    const kelvinToCelsius = (kelvin) => kelvin - 273.15;

    const getWeatherData = async () => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            const fetchPromise = fetch(apiUrl).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });

            const data = await toast.promise(fetchPromise, {
                pending: "Getting the data...",
                success: "Got the data!",
                error: "Error fetching data"
            });

            // Process the fetched data
            if (data && data.weather && data.weather[0] && data.main) {
                const mainWeather = data.weather[0].main;

                let svg = null;

                switch (mainWeather) {
                    case "Clear":
                        svg = cloudClear;
                        break;
                    case "Few clouds":
                        svg = cloudSun;
                        break;
                    case "Clouds":
                    case "Broken clouds":
                    case "Overcast clouds":
                        svg = cloudDbl;
                        break;
                    case "Rain":
                    case "Drizzle":
                        svg = cloudRainy;
                        break;
                    case "Thunderstorm":
                        svg = cloudThunder;
                        break;
                    case "Snow":
                    case "Sleet":
                        svg = cloudSnow;
                        break;
                    case "Haze":
                    case "Mist":
                    case "Fog":
                        svg = cloudHaze;
                        break;
                    default:
                        svg = cloudClear;
                }

                setWeatherData({
                    weatherDescription: data.weather[0].main,
                    temperatureCelsius: kelvinToCelsius(data.main.temp),
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                    cloud: data.clouds.all,
                    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                    windSpeed: data.wind.speed,
                    SVG: svg
                });
            } else {
                console.log('Incomplete data received from API');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getDailyForecasts = (forecastData) => {
        // Filter the forecast list to get the one closest to 12:00 PM each day
        return forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
    };

    const getForecastSVG = (mainWeather) => {
        switch (mainWeather) {
            case "Clear":
                return cloudClear;
            case "Few clouds":
                return cloudSun;
            case "Clouds":
            case "Broken clouds":
            case "Overcast clouds":
                return cloudDbl;
            case "Rain":
            case "Drizzle":
                return cloudRainy;
            case "Thunderstorm":
                return cloudThunder;
            case "Snow":
            case "Sleet":
                return cloudSnow;
            case "Haze":
            case "Mist":
            case "Fog":
                return cloudHaze;
            default:
                return cloudClear;
        }
    };

    const getForecastData = async () => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const dailyForecasts = getDailyForecasts(data);

            const processedForecasts = dailyForecasts.map(forecast => ({
                city: city,
                weatherDescription: forecast.weather[0].main,
                temperatureCelsius: kelvinToCelsius(forecast.main.temp),
                date: forecast.dt_txt,
                SVG: getForecastSVG(forecast.weather[0].main),
            }));

            setForecastData(processedForecasts);

            console.log("Processed Forecast Data: ", processedForecasts);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    // Fetch weather data on initial load
    useEffect(() => {
        getWeatherData();
    }, []);

    // Fetch forecast data after weather data has been successfully loaded
    useEffect(() => {
        if (weatherData && weatherData.lat && weatherData.lon) {
            getForecastData(weatherData.lat, weatherData.lon);
        }
    }, [weatherData]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <>
            <div className="Home">
                <ToastContainer />
                <h1 className="head">WeatherPulse {'>>'}</h1>
                <div className="container">
                    <div className="svgContainer">
                        {weatherData && weatherData.SVG && <div>{weatherData.SVG}</div>}
                    </div>
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
                    <div className="data">
                        {weatherData ? (
                            <>
                                <h3 className="info location">Location: {city}</h3>
                                <h3 className="info weather">Weather: {weatherData.weatherDescription}</h3>
                                <h3 className="info temp">Temperature: {weatherData.temperatureCelsius.toFixed(2)}°C</h3>
                                <h3 className="info wSpeed">Wind Speed: {weatherData.windSpeed} m/s</h3>
                                <h3 className="info clouds">Clouds: {weatherData.cloud}%</h3>
                                <h3 className="info sunRise">Sunrise: {weatherData.sunrise}</h3>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            <Forcasts forecastData={forecastData} />
        </>
    );
};

export default Home;