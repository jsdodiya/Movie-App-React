import React from 'react'
import { NavLink } from 'react-router-dom'

const Cards = ({ data, title }) => {
  return (
    <div className='w-full h-full px-[5%] flex flex-wrap justify-center items-center bg-[#1F1E24]'>
      {data.map((c, i) =>
        <NavLink className='w-[25vh] mr-[5%] mb-[5%]' key={i}>
          <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path
            }`} alt="" />

          <h1 className='text-zinc-300 text-2xl mt-3 font-semibold'>
            {c.name || c.title || c.original_name || c.original_title || 'Untitled'}

          </h1>
              
        </NavLink>)}
    </div>
  )
}

export default Cards