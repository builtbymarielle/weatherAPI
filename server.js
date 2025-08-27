const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("."));
app.get("/api/weather", async (req, res) => {
  const { q, days } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!q) {
    return res.status(400).json({ message: "City parameter (q) is required" });
  }
  if (!apiKey) {
    console.error("WEATHER_API_KEY is not set in .env file");
    return res
      .status(500)
      .json({ message: "Server configuration error: API key is missing." });
  }

  const forecastDays = days || 2;
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=${forecastDays}&aqi=no&alerts=no`;

  try {
    const weatherResponse = await fetch(apiUrl);
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      return res.status(weatherResponse.status).json(weatherData);
    }

    res.json(weatherData);
  } catch (error) {
    console.error("Error proxying weather data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error while fetching weather data." });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log("Access your app at http://localhost:3000/index.html");
});
