import { useState } from "react";

const api = {
  key: "5ac80301d03ad3ec7d0928bd7a84fcd4",
  base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherApi() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        console.error("Greška pri preuzimanju podataka:", error);
      });
  };

  return (
    <div className="Weather">
      <header className="Weather-header">
        <h2 style={{ textAlign: "center" , color:"white"}}>Proveri da li je vreme pogodno za trčanje:</h2>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Unesite željeni grad"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Pretraži</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default WeatherApi;