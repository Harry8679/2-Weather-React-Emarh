import React, { useState } from 'react';
import './WeatherApp.css';

const API_KEY = 'TA_CLE_API'; // Remplace par ta clé OpenWeatherMap

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('Ville non trouvée');
      const data = await res.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const getBackgroundColor = (temp) => {
    if (temp <= 5) return 'cold';
    if (temp <= 20) return 'mild';
    return 'hot';
  };

  const iconURL = weather
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
    : '';

  return (
    <div className={`app ${weather ? getBackgroundColor(weather.main.temp) : ''}`}>
      <div className="card">
        <h1>🌦️ Météo</h1>
        <input
          type="text"
          placeholder="Entrez une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Rechercher</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img src={iconURL} alt="weather-icon" />
            <p>{weather.weather[0].description}</p>
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p>Humidité : {weather.main.humidity}%</p>
            <p>Vent : {weather.wind.speed} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;