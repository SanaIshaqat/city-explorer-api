'use strict';
const WeekForCast = require("../Models/Weather.model");
const axios = require('axios');

const handleWeather = async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&days=7&lat=${lat}&lon=${lon}`
    let responseData = await axios.get(url);
    let weatherData = responseData.data;
    let finalCleaned = weatherData.data.map(item => {
        return new WeekForCast(item.datetime, item.weather.description);
    })
    res.status(200).json(weatherData.data);
}

module.exports = handleWeather;