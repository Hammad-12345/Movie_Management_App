import React from 'react'

const Banner = () => {
  return (
    <div className='banner_movie_app flex flex-col gap-2 justify-center p-4'>
        <span className='text-yellow-300 text-lg'>Movflx</span>
        <p className='md:text-7xl text-4xl my-0 text-white '>
        Unlimited <span className='text-yellow-300'>Movie</span>, TVs Shows, & More.
        </p>
    </div>
  )
}

export default Banner