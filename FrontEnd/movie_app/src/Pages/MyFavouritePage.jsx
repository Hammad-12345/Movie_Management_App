import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import MyFavourite from '../Components/MyFavourite'
import FavouriteMoviesList from '../Components/FavouriteMoviesList'

const MyFavouritePage = () => {
  return (
    <>
    <Header/>
    <MyFavourite/>
    <FavouriteMoviesList/>
    <Footer/>
    </>
  )
}

export default MyFavouritePage