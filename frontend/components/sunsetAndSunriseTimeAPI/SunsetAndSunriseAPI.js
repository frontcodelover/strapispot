import React, { useState, useEffect } from "react";
import { FiSunset, FiSunrise } from "react-icons/fi";

const { OPEN_WEATHER_API_KEY } = process.env;

export default function SunsetAndSunriseTimeAPI({ latitude, longitude }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataFromOpenWeather, setDataFromOpenWeather] = useState([{}]);
  const [timeZone, setTimeZone] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${OPEN_WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setIsLoaded(true);
        const sunsetRes = response.sys;
        const timezone = response.timezone;
        const temperatureData = response.main;
        const weatherData = response.weather;

        setTemperature(temperatureData.temp);
        setTimeZone(timezone);

        setWeather(weatherData[0].icon);
        setDataFromOpenWeather(sunsetRes);
      })
      .catch((err) => console.error(err));
  }, []);

  //* Transformation des datas en heure et minutes
  const sunsetTime = dataFromOpenWeather.sunset + timeZone;
  const sunset = new Date(sunsetTime * 1000);
  const hourOfSunset = sunset.getUTCHours();
  const minuteOfSunset =
    (sunset.getMinutes() < 10 ? "0" : "") + sunset.getMinutes();

  const sunriseTime = dataFromOpenWeather.sunrise + timeZone;
  const sunrise = new Date(sunriseTime * 1000);
  const hourOfSunrise = sunrise.getUTCHours();
  const minuteOfSunrise = sunrise.getUTCMinutes();

  return (
    <div>
      <div className="text-orange-600 flex font-semibold">
        <FiSunrise className="mr-2 rounded-full text-white bg-orange-600 p-2 w-8 h-8" />
        Lever de soleil : {hourOfSunrise} h {minuteOfSunrise} min{" "}
      </div>
      <div className="text-orange-800 flex py-2 font-semibold">
        <FiSunset className="mr-2 rounded-full text-white bg-orange-800 p-2 w-8 h-8" />
        Coucher de soleil : {hourOfSunset} h {minuteOfSunset} min{" "}
      </div>
      {temperature && (
        <div className="text-orange-600 flex">
          Température actuelle : {temperature.toFixed(0)}°C
        </div>
      )}
      <img
        src={`http://openweathermap.org/img/wn/${weather}.png`}
        alt="picto-meteo"
        className="w-15 h-15"
      />
    </div>
  );
}
