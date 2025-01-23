import React from 'react'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import axios from '../utils/axios'
import { useState, useEffect } from 'react'
import Header from './templates/Header'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'
import Loading from './Loading'

const Home = () => {
    document.title = 'Movie App | Homepage'
    const [wallpaper, setWallpaper] = useState(null)
    const [trending, setTrending] = useState(null)
    const [category, setCategory] = useState("all")

    //GET WALLPAPER FUNCTION
    const GetHeadWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            let random = data.results[(Math.random() * data.results.length).toFixed()]
            setWallpaper(random);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    //  GET TRENDING FUCNTUON
    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);

            setTrending(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        GetTrending()
        !wallpaper && GetHeadWallpaper();

    }, [category]);



    return wallpaper && trending ? (
        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
                <Topnav />
                <Header data={wallpaper} />

                <div className='flex justify-between p-5'>

                    <h1 className='ml-2 text-3xl font-semibold text-zinc-400'>Trending</h1>

                    <Dropdown title="Filter" options={['tv', 'movie', 'all']} func={(e) => setCategory(e.target.value)} />

                </div>

                <HorizontalCards data={trending} />
            </div>

        </>

    ) : <Loading/>
}

export default Home