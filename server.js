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

let handleMovie = async (req, res) => {   
    let country=req.query.query;

    let url=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${country}`
  
    let responseMovies = await axios.get(url);
    let movieData = responseMovies.data;
    console.log(movieData)
    let finalCleanedMovies = movieData.results.map(item => {
        return new MoviesCountry(item.title,item.overview, item.vote_average,item.vote_count,item.poster_path,item.popularity,item.release_date);
    })
    console.log('Test',finalCleanedMovies);
    res.status(200).json(finalCleanedMovies);
}

app.get('/movies', handleMovie)


class MoviesCountry{
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date){
        this.title=title,
        this.overview=overview, 
        this.vote_average=vote_average,
        this.vote_count=vote_count,
        this.poster_path=`https://image.tmdb.org/t/p/w500${poster_path}`,
        this.popularity=popularity,
        this.release_date=release_date
    }
}
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)

});
