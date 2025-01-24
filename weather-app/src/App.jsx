import React, {useState} from 'react'
import Weather from './components/Weather'
import WeatherCarousel from './components/WeatherCarousel';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  
  return (
  //   <div className={`app ${isDarkMode ? "dark" : "light"}`}>
  //   <button onClick={toggleTheme} className="theme-toggle">
  //     <span>{isDarkMode ? "☀️": "🌙"}</span>
  //     {isDarkMode ? " Light Mode" : " Dark Mode"}
  //   </button>
  //   <Weather />
  // </div>

  <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        <span>{isDarkMode ? "☀️":"🌙"}</span>
        {isDarkMode ? " Tryb jasny" : " Tryb ciemny"}
      </button>

      <WeatherCarousel />
    </div>
  )
}

export default App