import { useState } from "react";


const toDateFunction = () => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const WeekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
        }`;
    return date;
};

const Weather = () => {
    const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const getWeather = () => {
    const apiKey= "e05deee85433027fe3a5714c6142e2c6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
       
        const weather = {
          location: `Weather in ${data.name}, ${data.sys.country}`,
          temperature: `${Math.round(data.main.temp)}`,
          humidity: `Humidity: ${data.main.humidity}%`,
          wind: `Wind: ${data.wind.speed} km/h`,
          condition: `${data.weather[0].description}`,
          icon: data.weather[0].icon,
        };

        setWeatherInfo(weather);
      })
      .catch((error) => {
        console.error("Error:", error);

      });
  }

  return (
    <div className="weather-container">
        <h1 className="app-name">
			Weather App
			</h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name.."
                    name="query"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={getWeather}
                />
            </div>
    
    {weatherInfo && (
      <div className="weather-info">
      
      <h3 className="city-name">{weatherInfo.location}</h3>
      <div className="date">
						<span>{toDateFunction()}</span>
					</div>
      <div className="icon-temp">
						<img
							className=""
							src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
							alt={weatherInfo.condition}
						/>
						<span className="temp">{weatherInfo.temperature}<sup className="deg">°C</sup></span> 
						
                        <p>{weatherInfo.condition.toUpperCase()}</p>
                        
					</div>
      <p>{weatherInfo.wind}</p>
      <p>{weatherInfo.humidity}</p>
      
      
      
    </div>
    )}
  </div>
  )
}

export default Weather;