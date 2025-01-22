import React from 'react'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import axios from '../utils/axios'
import { useState,useEffect } from 'react'
import Header from './templates/Header'
import HorizontalCards from './templates/HorizontalCards'

const Home = () => {
    document.title = 'Movie App | Homepage'
    const [wallpaper, setWallpaper] = useState(null)
    const [trending, setTrending] = useState(null)

    const GetHeadWallpaper =async () => {
      try {
          const { data } = await axios.get(`/trending/all/day`);
          let random = data.results[(Math.random()*data.results.length).toFixed()]
          setWallpaper(random); 
      } catch (error) {
          console.error('Error fetching search results:', error);
      }
  };

  useEffect(() => {
          !wallpaper && GetHeadWallpaper();
      }, []);


      const GetTrending =async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            
            setTrending(data.results); 
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
  
    useEffect(() => {
            !trending && GetTrending()
            
        }, []);

        console.log(trending)    

  return wallpaper && trending ? (
    <>
    <Sidenav/>
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
    <Topnav/>
    <Header data={wallpaper}/>
    <HorizontalCards data={trending}/>
    </div>
    
    </>
    
  ): <h1>Laoding</h1>
}

export default Home