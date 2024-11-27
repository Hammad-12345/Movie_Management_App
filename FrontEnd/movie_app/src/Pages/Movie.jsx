import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import MovieBanner from '../Components/MovieBanner'
import MovieList from '../Components/MovieList'

const Movie = () => {
  return (
    <>
    <Header/>
    <MovieBanner/>
    <MovieList/>
    <Footer/>
    </>
  )
}

export default Movie