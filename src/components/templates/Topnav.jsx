import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../utils/axios';
import NoImage from '/No.jpg';

const Topnav = () => {
    const [query, setQuery] = useState('');
    const [searches, setSearches] = useState([]);

    const GetSearches = async () => {
        if (!query.trim()) return; // Prevent unnecessary API calls for empty queries
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results || []); // Ensure `searches` is always an array
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        GetSearches();
    }, [query]);

    return (
        <div className="ml-[15%]">
            <div className="w-full h-[8vh] relative flex justify-start items-center z-30">
                <i className="text-zinc-400 text-3xl ri-search-line"></i>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
                    type="text"
                    placeholder="Search Anything"
                />
                {query.length > 0 && (
                    <i
                        onClick={() => setQuery('')}
                        className="text-zinc-400 text-3xl ri-close-line cursor-pointer"
                    ></i>
                )}

                {query.length > 0 && searches.length > 0 && (
                    <div className="absolute w-[55%] max-h-[50vh] bg-zinc-200 opacity-75 top-[100%] left-[5%] overflow-auto rounded">
                        {searches.map((s, i) => (
                            <NavLink
                                key={i}
                                to={`/${s.media_type}/details/${s.id}`} // Add a valid route or `to` value here
                                className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-10 flex justify-start items-center border-b-2 border-zinc-100"
                            >
                                <img
                                    className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                                    src={s.backdrop_path || s.profile_path
                                        ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                                        : NoImage}
                                    alt={s.title || s.original_name || 'No Title'}
                                />
                                <span>{s.name||s.title || s.original_name || s.original_title || 'Untitled'}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topnav;
