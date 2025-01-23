import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Trending = () => {
  const navigate = useNavigate()

  return (
    <div className='p-[3%] w-screen h-screen'>
      
      <div className=' w-full  flex items-center'>
        <NavLink   onClick={() => navigate(-1)}><i class="ri-arrow-left-line"></i></NavLink>
        <h1 className='text-2xl text-zinc-400 font-bold'>Trending</h1>
      </div>
      
      </div>
  )
}

export default Trending