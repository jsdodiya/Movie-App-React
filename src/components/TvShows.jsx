import React, { useState,useEffect} from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import Cards from './templates/Cards'
import Loading from './Loading'
import Scroll from 'react-infinite-scroll-component'


const TvShows = () => {
    document.title = `Movie App | Tv Shows `
      const navigate = useNavigate()
      const [category, setCategory] = useState('airing_today')
      const [tvshows, setTvshows] = useState([])
      const [page, setPage] = useState(1)
      const [hasMore, setHasMore] = useState(true)

      const GetTvshows = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
    
            if(data.results.length > 0){
              setTvshows((prevstate) => [...prevstate, ...data.results]);
              setPage(page+1)
            }else{
              setHasMore(false)
              
            }
    
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    
    
    const refreshhadnler =() => {
      if(tvshows.length === 0){
        GetTvshows()
      }else{
        setPage(1)
        setTvshows([])
        GetTvshows()
        
      }
    }
    
    useEffect(()=>{
      refreshhadnler()
    },[category])
      
    return (tvshows.length > 0 ? (
        <div className=' w-full h-screen'>
          
          <div className='px-[5%] w-full flex items-center justify-between'>
          <h1 className=' text-2xl text-zinc-400 font-semibold'>
            <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
            {' '}TV Shows
            </h1>        
    
            <div className='flex items-center w-[80%]'>
            <div className='w-[100%]'>
            <Topnav />
            </div>
            <Dropdown title={category} options={['airing_today','on_the_air','top_rated','popular']} func={(e)=>setCategory(e.target.value)}/>
            
            
         
            </div>
            
          </div>
          <Scroll
          dataLength={tvshows.length}
          next={GetTvshows}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}     >
             <Cards data={tvshows} title={category}/>
          </Scroll>
    
          </div>
      ): <Loading/>
      )
    }
    

export default TvShows