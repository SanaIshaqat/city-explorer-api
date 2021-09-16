'use strict';
const WeekForCast = require("../Models/Weather.model");
const axios = require('axios');

const Cache = require("../Helpers/cache");
let cache = new Cache();

const handleWeather = async (req, res) => {
    let country = req.query.country;
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&days=7&lat=${lat}&lon=${lon}`;

    if (cache.country === country) {
        res.json({ "data": cache, "Message": "Data is Coming From Cache" });
    }
    else {

        let responseData = await axios.get(url);
        let weatherData = responseData.data;


        let finalCleaned = weatherData.data.map(item => {
            return new WeekForCast(item.datetime, item.weather.description);
        })
        cache.country = country;
        cache.data = finalCleaned;
        res.status(200).json({ "data": cache.data, "Message": "Data is Coming from API" });
    }
    // res.send(cache);
}

module.exports = handleWeather;