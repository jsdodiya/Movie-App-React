import React from 'react'
import { NavLink } from 'react-router-dom'


const Sidenav = () => {

    
    return (
        <div className='w-[20%] h-full border-r-2 border-zinc-400 p-10'>
            <h1 className='text-2xl text-white font-bold '>
                <i className="text-[#6556CD] ri-tv-fill mr-2 "></i>
                <span className='text-2xl'> Movie App </span>
            </h1>
            
            <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
            
            <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds 
                </h1>
                <NavLink to="/trending" className={({ isActive }) =>isActive? "bg-[#6556CD] text-white duration-300 rounded-lg p-5": "hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"}><i className="mr-2 ri-fire-fill"></i>Trending</NavLink>
                <NavLink className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"><i className="mr-2 ri-bard-fill"></i>Popular</NavLink>
                <NavLink className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"><i className="mr-2 ri-movie-ai-fill"></i>Movies</NavLink>
                <NavLink className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"><i className="mr-2 ri-tv-2-fill"></i>Tv Shows</NavLink>
                <NavLink className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"><i className="mr-2 ri-user-5-fill"></i>Peoples</NavLink> 
            
            </nav>

            <hr className='border-none h-[1px] bg-zinc-400'/>
            <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
            
            <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information 
                </h1>
                <NavLink className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"><i className="mr-2 ri-briefcase-4-fill"></i>About</NavLink>
                <NavLink className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5"><i className="mr-2 ri-contacts-fill"></i>Contact Us</NavLink>
                
            
            </nav>
      </div>
    )
}

export default Sidenav