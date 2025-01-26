import React, { useEffect, useRef, useState } from "react";
import "./WeatherCarousel.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import wind_direction_icon from "../assets/wind-direction.png";

const WeatherCarousel = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const getWindDirection = (deg) => {
    const directions = [
      "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"
    ];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const search = async (city) => {
    if (city === "") {
      alert("Wpisz nazwę miasta");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const now = new Date(); 
      const filteredData = data.list.filter((forecast) => {
        const forecastTime = new Date(forecast.dt_txt);
        return forecastTime >= now;
      });

      const dailyData = filteredData
        .filter((_, index) => index % 8 === 0)
        .map((forecast) => ({
          humidity: forecast.main.humidity,
          windSpeed: forecast.wind.speed,
          windDirection: getWindDirection(forecast.wind.deg),
          temperature: Math.floor(forecast.main.temp),
          location: data.city.name,
          date: new Date(forecast.dt_txt).toLocaleDateString("pl-PL", {
            weekday: "long",
            day: "numeric", 
            month: "long", 
          }),
          icon: allIcons[forecast.weather[0].icon] || clear_icon,
        }));

      setWeatherData(dailyData);
    } catch (error) {
      setWeatherData([]);
      console.error("Błąd przy pobieraniu danych");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < weatherData.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    search("Sosnowiec");
  }, []);

  return (
    <div className="weather-carousel">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Szukaj" />
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData.length > 0 ? (
        <>
          <div className="carousel-window">
            <div
              className="carousel-content"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {weatherData.map((day, index) => (
                <div className="weather-card" key={index}>
                  <p className="day">{day.date}</p>
                  <img src={day.icon} alt="weather icon" className="weather-icon" />
                  <p className="temperature">{day.temperature}°C</p>
                  <p className='location'>{day.location}</p>
                  <div className="weather-data">
                    <div className="col">
                      <img src={humidity_icon} alt="" />
                      <div>
                        <p>{day.humidity}%</p>
                        <span>Wilgotność</span>
                      </div>
                    </div>
                    <div className="col">
                      <img src={wind_icon} alt="" />
                      <div>
                        <p>{day.windSpeed} Km/h</p>
                        <span>Prędkość wiatru</span>
                      </div>
                    </div>
                    <div className="col">
                      <img src={wind_direction_icon} alt="" />
                      <div>
                        <p>{day.windDirection}</p>
                        <span>Kierunek wiatru</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="arrow right" onClick={handleNext} disabled={currentIndex === weatherData.length - 1}>
            &gt;
          </button>

          <button className="arrow left" onClick={handlePrev} disabled={currentIndex === 0}>
            &lt;
          </button>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherCarousel;