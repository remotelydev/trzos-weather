import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Chart from './Chart'

function Weather({ woeid }) {
  const [weather, setWeather] = useState({})
  
  useEffect( () => {
    const fetchWeather = async () => {
      fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        setWeather(json)
      });
    }
    
    woeid && fetchWeather();
  }, [woeid])
  
  return (
    <WeatherPage>
      {Object.keys(weather).length ? (
        <>
          <div className="weather-slice">
            <h1>{weather.title}</h1>
            <span>{getDateString(weather.time)}</span>
          </div>

          <div className="weather-slice now">
            <label>Now</label>
            <div>
              <span className="temp">{Math.round(weather.consolidated_weather[0].the_temp)}&deg;</span>
              <span className="state">{weather.consolidated_weather[0].weather_state_name}</span>
            </div>
          </div>

          <div className="weather-slice stats">
            <div>
              <label>MAX</label>
              <p>{Math.round(weather.consolidated_weather[0].max_temp)}&deg;</p>
            </div>
            <div>
              <label>MIN</label>
              <p>{Math.round(weather.consolidated_weather[0].min_temp)}&deg;</p>
            </div>
            <div>
              <label>HUMIDITY</label>
              <p>{Math.round(weather.consolidated_weather[0].humidity)}<span>%</span></p>
            </div>
            <div>
              <label>WIND</label>
              <p>{Math.round(weather.consolidated_weather[0].wind_speed * 1.60934)}<span>km/h</span></p>
            </div>
          </div>

          <div>
            <Chart data={weather.consolidated_weather}/>
          </div>
        </>
      ) : (
        <h2>Please search for a location for your weather forecast</h2>
        )}
    </WeatherPage>
  );
}

function getDateString(date) {
  // I'd move this to ulilites file if we needed that function somewhere elese
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
}

const WeatherPage = styled.main`
  h1 {
    font-size: 6rem;
    margin: 0;
  }

  label {
    color: #A0AEC0;
  }

  .now {
    div {
      display: flex;
      align-items: center;
    }
    .temp {
      font-size: 5rem;
      padding-right: 1.5rem;
    }
    .state {
      height: 100%;
      color: #A0AEC0;
      border-left: 1px solid #E2E8F0;
      padding-left: 1.5rem;
      line-height: 5rem;
    }
  }

  .stats {
    display: flex;
    justify-content: space-between;
    max-width: 500px;

    p {
      margin: 0;
      font-size: 3rem;

      span {
        font-size: 1.5rem;
      }
    }
  }

  .weather-slice {
    margin-bottom: 3rem;
  }
`;

export default Weather;
