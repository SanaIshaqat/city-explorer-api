"use strict";
const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const handleWeather = require('./Controllers/Weather.controller');
const handleMovie = require('./Controllers/Movies.controller');
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ "Layout": "like this" })
})
server.get('/weather', handleWeather)
server.get('/movies', handleMovie)

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)

});
