"use srtict";
const MoviesCountry = require("../Models/Movies.model");
const axios = require('axios');

const handleMovie = async (req, res) => {
    let country = req.query.query;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${country}`

    let responseMovies = await axios.get(url);
    let movieData = responseMovies.data;
    console.log(movieData)
    let finalCleanedMovies = movieData.results.map(item => {
        return new MoviesCountry(item.title, item.overview, item.vote_average, item.vote_count, item.poster_path, item.popularity, item.release_date);
    })
    console.log('Test', finalCleanedMovies);
    res.status(200).json(finalCleanedMovies);
}
module.exports = handleMovie;