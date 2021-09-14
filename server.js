"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;



app.get('/weather', (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let searchQuery = req.query.searchQuery;
    if (lat && lon || searchQuery) {

        let results = weatherData.find(item => item.display_name === searchQuery)
        if (results) {
            let forCast = results.data.map(item => {

                return {
                    date: item.datetime,
                    description: item.weather.description,
                }
            })
            res.status(200).json(forCast);
        } else {
            res.status(404).send("City Not Found")
        }



    } else {
        res.status(400).send("please send right query params")
    }

})



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)

});
