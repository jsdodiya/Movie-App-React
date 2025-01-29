import React, { useState,useEffect} from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import Cards from './templates/Cards'
import Loading from './Loading'
import Scroll from 'react-infinite-scroll-component'



const Movies = () => {
  document.title = `Movie App | Movies `
  const navigate = useNavigate()
  const [category, setCategory] = useState('now_playing')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const GetMovies = async () => {
    try {
        const { data } = await axios.get(`/movie/${category}?page=${page}`);

        if(data.results.length > 0){
          setMovies((prevstate) => [...prevstate, ...data.results]);
          setPage(page+1)
        }else{
          setHasMore(false)
          
        }

    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};


const refreshhadnler =() => {
  if(movies.length === 0){
    GetMovies()
  }else{
    setPage(1)
    setMovies([])
    GetMovies()
    
  }
}

useEffect(()=>{
  refreshhadnler()
},[category])

  return (movies.length > 0 ? (
    <div className=' w-full h-screen'>
      
      <div className='px-[5%] w-full flex items-center justify-between'>
      <h1 className=' text-2xl text-zinc-400 font-semibold'>
        <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
        {' '}Movies
        </h1>        

        <div className='flex items-center w-[80%]'>
        <div className='w-[100%]'>
        <Topnav />
        </div>
        <Dropdown title={category} options={['now_playing','popular','top_rated','upcoming']} func={(e)=>setCategory(e.target.value)}/>
        
        
     
        </div>
        
      </div>
      <Scroll
      dataLength={movies.length}
      next={GetMovies}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}     >
         <Cards data={movies} title={category}/>
      </Scroll>

      </div>
  ): <Loading/>
  )
}


export default Movies