import { useState } from "react";
import { Button } from "./Button";

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
    <div className="Weather" style={{ padding: "20px", fontSize: "20px" }}>
      <header className="Weather-header">
        <h2 style={{ textAlign: "center", color: "white" }}>
          Proveri da li je vreme pogodno za trčanje:
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Unesite željeni grad"
            style={{
              fontSize: "18px",
              padding: "8px",
              marginRight: "5px", 
              marginTop: "15px",
              width: "250px", 
              height: "40px", 
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          
         
          <Button
            type="button"
            onClick={searchPressed}
            buttonStyle="btn--primary"
            buttonSize="btn--large"
          >
            Pretraži
          </Button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "white",
              fontSize: "20px",
            }}
          >
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