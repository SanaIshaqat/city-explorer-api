"use srtict";
const MoviesCountry = require("../Models/Movies.model");
const axios = require('axios');
const Cache = require("../Helpers/cache");
let cache = new Cache();

const handleMovie = async (req, res) => {
    let country = req.query.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${country}`
    
    if (cache.country === country) {
        res.json({ "data": cache, "Message": "Data is Coming From Cache" });
    }
    else {
        let responseMovies = await axios.get(url);
        let movieData = responseMovies.data;
        console.log(movieData)
        let finalCleanedMovies = movieData.results.map(item => {
            return new MoviesCountry(item.title, item.overview, item.vote_average, item.vote_count, item.poster_path, item.popularity, item.release_date);
        })
        cache.country = country;
        cache.data = finalCleanedMovies;
        console.log('Test', finalCleanedMovies);
        res.status(200).json({ "data": cache.data, "Message": "Data is Coming from API" });    
    }
}
module.exports = handleMovie;