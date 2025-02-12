import React, { useState, useEffect } from "react";
      import "./App.css"; // Custom CSS for styling
      
      function App() {
        const [city, setCity] = useState("Beirut");
        const [weather, setWeather] = useState(null);
        const [loading, setLoading] = useState(false);
        const API_KEY = "21fd38cc6c46480e8f3141632251202"; // Replace with your actual WeatherAPI key
      
        const fetchWeather = (location) => {
          setLoading(true);
          fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`
          )
            .then((response) => response.json())
            .then((data) => {
              setWeather(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
              setLoading(false);
            });
        };
      
        useEffect(() => {
          fetchWeather(city);
        }, []);
      
        const handleSearch = () => {
          if (city.trim() !== "") {
            fetchWeather(city);
          }
        };
      
        return (
          <div className="app-container">
            <h1>Weather App</h1>
      
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
      
            {/* Weather Display */}
            {loading ? (
              <p>Loading...</p>
            ) : weather ? (
              <div className="weather-info">
                {/* Current Weather */}
                <div className="current-weather">
                  <h2>{weather.location.name}, {weather.location.country}</h2>
                  <p>Temperature: {weather.current.temp_c}°C</p>
                  <p>Condition: {weather.current.condition.text}</p>
                  <p>Humidity: {weather.current.humidity}%</p>
                  <p>Wind: {weather.current.wind_kph} kph</p>
                  <img src={weather.current.condition.icon} alt="Weather icon" />
                </div>
      
                {/* 7-Day Forecast */}
                <h3>7-Day Forecast</h3>
                <div className="forecast-container">
                  {weather.forecast.forecastday.map((day) => (
                    <div key={day.date} className="forecast-item">
                      <p>{day.date}</p>
                      <img src={day.day.condition.icon} alt="Weather icon" />
                      <p>{day.day.condition.text}</p>
                      <p>Temp: {day.day.avgtemp_c}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Enter a city to get weather details.</p>
            )}
          </div>
        );
      }
      
      export default App;
      