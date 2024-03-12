import React, { useState } from "react";
import './App.css'; // Import your CSS file

const api={
  key:"cebe7ebc2803d60e8614b097092febb4",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [started, setStarted] = useState(false);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
      
        });
    }
  }

  const handleStartWeatherApp = () => {
    setStarted(true);
  };

  const dataBuilder = (d) => {
    let months = ["January", "February","March","April","May","June","July","August","September","october","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main !== "undefined") ? (weather.main.temp > 16) ? 'app warm' : 'app cold' : 'app'}>
      {!started && (
        <div className="welcome-page">
          <h1>Welcome to Weather finder</h1>
          <button className="start-button" onClick={handleStartWeatherApp}>Let's Start</button>
        </div>
      )}
      {started && (
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Enter City.."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main !== "undefined") && (
            <div>
              <div className="location-box">
                <div className="location">{weather.name},{weather.sys.country}</div>
                <div className="date">{dataBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)} °C</div>
                <div className="Weather">{weather.weather[0].main}</div>
                <strong>{weather.weather[0].main}</strong>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
