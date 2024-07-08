// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY } from './config';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">D Weather App</h1>
      <form className="form" onSubmit={getWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input"
        />
        <button type="submit" className="button">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2 className="city-name">{weather.name}</h2>
          <div className="weather-details">
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Visibility: {weather.visibility} meters</p>
            {weather.rain && <p>Rain (last hour): {weather.rain['1h']} mm</p>}
            <p>Cloudiness: {weather.clouds.all}%</p>
            <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
