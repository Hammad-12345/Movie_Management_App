const express = require("express");
const FavouriteMovierouter = express.Router()
const { favouritemovieuser,fetchfavouritemovieuser } = require('../../controller/FavouriteMovieController/FavouriteMovieController') 
const { uservalidate } = require('../../../MiddelWare/UserValidate') 

// User Register Api
FavouriteMovierouter.post('/Movie',uservalidate,favouritemovieuser)
FavouriteMovierouter.get('/FetchMovies/:id',uservalidate,fetchfavouritemovieuser)


module.exports = { FavouriteMovierouter }