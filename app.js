const axios = require("axios");
require("dotenv").config();

const temperatureApi = "https://raspi-temperature.herokuapp.com/";
const weatherApi = `https://api.darksky.net/forecast/${
  process.env.WEATHER_KEY
}/53.2464214,10.4115179?exclude=flags,minutely,daily,alerts`;

const getData = async () => {
  try {
    console.log("weather API data fetched");
    const result = await axios.get(weatherApi);
    return result.data.currently.temperature;
  } catch (error) {
    console.log(error);
  }
};

const sendData = async temperature => {
  console.log("data send: " + temperature);
  axios.post(temperatureApi, {
    temp: temperature
  });
};

const runEveryHour = () => {
  setTimeout(() => {
    executeFunc();
  }, 3600000);
};

const executeFunctions = async () => {
  const temp = await getData();
  const celsius = Math.round((temp - 32) / 1.8);
  sendData(celsius);
  runEveryHour();
};

executeFunctions();
