"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
require('dotenv').config();
// const weatherData = require('./data/weather.json');********OLD WEATHER LOCAL API********
const PORT = process.env.PORT;


// ********OLD WEATHER LOCAL API********
// app.get('/weather', (req, res) => {
//     let lat = Number(req.query.lat);
//     let lon = Number(req.query.lon);
//     let searchQuery = req.query.searchQuery;
//     if (lat && lon || searchQuery) {

//         let results = weatherData.find(item => item.display_name === searchQuery)
//         if (results) {
//             let forCast = results.data.map(item => {

//                 return {
//                     date: item.datetime,
//                     description: item.weather.description,
//                 }
//             })
//             res.status(200).json(forCast);
//         } else {
//             res.status(404).send("City Not Found")
//         }



//     } else {
//         res.status(400).send("please send right query params")
//     }

// })
// ********OLD WEATHER LOCAL API********

app.get('/', (req, res) => {
    res.status(200).json({ "Layout": "like this" })
})

let handleWeather = async (req, res) => {   
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

app.get('/weather', handleWeather)




class WeekForCast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}

// let handleMovie = async (req, res) => {   
//     let country=req.query.production_countries;
    
//     let url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&production_countries=${country}`
//     let responseMovies = await axios.get(url);
//     let movieData = responseMovies.data;
//     let finalCleanedMovies = movieData.map(item => {
//         return new MoviesCountry(item.origin_country, item.title);
//     })
//     console.log(finalCleanedMovies);
//     res.status(200).json(movieData.data);
// }

// app.get('/movies', handleMovie)



// class MoviesCountry{
//     constructor(origin,title){
//         this.title=title,
//         this.origin=origin
//     }
// }
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)

});
