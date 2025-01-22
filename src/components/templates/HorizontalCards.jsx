import React, { useState,useEffect } from 'react'
import axios from '../../utils/axios'
import { NavLink } from 'react-router-dom'


const HorizontalCards = ({data}) => {

   
    
  return (
    <div className='w-full h-[34.5vh] p-5 '>

        <div className='mb-5'>

        <h1 className=' ml-2 text-3xl font-semibold text-zinc-400'>Trending</h1>

        </div>

        

        <div className='w-[100%] h-[40vh] flex overflow-x-auto overflow-y-hidden'>

        {data.map((d,i)=>(
            <div key={i} className='min-w-[15%] bg-zinc-900 mr-5 mx-5'>
                <img
                className='w-full h-[45%] object-cover'
                src={`https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.poster_path || ''
                })`} alt="" />
            <h1 className=" text-xl font-black text-white">
            {d.name || d.title || d.original_name || d.original_title || 'Untitled'}
        </h1>
        <p className="text-white  mt-5 mb-3">
            {d.overview?.slice(0, 100)}...
            <span className="text-blue-400"> more</span>
        </p>
    </div>
))}

        </div>

    </div>
  )
}

export default HorizontalCards