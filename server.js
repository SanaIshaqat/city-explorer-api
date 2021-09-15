"use strict";
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
const handleWeather = require('./Controllers/Weather.controller')
const handleMovie = require('./Controllers/Movies.controller')

app.get('/', (req, res) => {
    res.status(200).json({ "Layout": "like this" })
})

app.get('/weather', handleWeather)
app.get('/movies', handleMovie)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)

});
