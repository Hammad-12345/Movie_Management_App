import React from 'react'
import { Link } from 'react-router-dom'

const MovieBanner = () => {
  return (
    <>
    <div className='Movie_banner flex flex-col items-center justify-center gap-4'>
        <div className='text-6xl text-white'>Our <span className='text-yellow-300'>Movie</span></div>
        <div className='flex gap-4 items-center'>
            <Link to={"/"} style={{textDecoration:"none"}}className='text-yellow-300 text-md'>Home</Link>
            <hr className='h-3 w-0'/>
            <div className='text-white text-md'>Movie</div>
        </div>
    </div>
    </>
  )
}

export default MovieBanner