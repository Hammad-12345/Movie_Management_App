import React from 'react'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import OurService from '../Components/OurService'
import LatestMovies from '../Components/LatestMovies'

const Home = () => {
  return (
    <>
    <Header/>
    <Banner/>
    <LatestMovies/>
    <OurService/>
    <Footer/>
    </>
  )
}

export default Home