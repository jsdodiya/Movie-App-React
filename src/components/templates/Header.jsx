import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({data}) => {
    // console.log(data);

    return (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.profile_path || ''
                })`,
                backgroundPosition:'top ',
                backgroundSize:'cover',
            }}
            className="w-full h-[50vh] flex flex-col justify-end items-start pl-[4%] pt-[4%] pb-[2%]">
            <h1 className='w-[70%] text-5xl font-black text-white'>
            {data.name||data.title || data.original_name || data.original_title || 'Untitled'}
            </h1>
            <p className='text-white w-[60%] mt-5 mb-3'>{data.overview.slice(0,200)}...<NavLink to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'> more</NavLink></p>
            <p className='text-white '>
            <i className=" text-[#6556CD] ri-megaphone-fill"></i> {data.release_date || 'No Information'}
            <i className="ml-5 text-[#6556CD] ri-album-fill"></i> {data.media_type.toUpperCase()}

            </p>
            <NavLink className='p-4 bg-transparent border-2 rounded mt-5 text-white hover:bg-[#6556CD]'> Watch Trailer</NavLink>
        </div>
    );
};

export default Header;
