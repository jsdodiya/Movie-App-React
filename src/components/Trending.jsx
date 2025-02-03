import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from '../components/Loading'
import Scroll from 'react-infinite-scroll-component'

const Trending = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [duration, setDuration] = useState('day')
  const [trending, setTrending] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  document.title = `Movie App | Trending`

  const GetTrending = async () => {
    try {
        const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

        if(data.results.length > 0){
          setTrending((prevstate) => [...prevstate, ...data.results]);
          setPage(page+1)
        }else{
          setHasMore(false)
          
        }

    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};


const refreshhadnler =() => {
  if(trending.length === 0){
    GetTrending()
  }else{
    setPage(1)
    setTrending([])
    GetTrending()
    
  }
}

useEffect(()=>{
  refreshhadnler()
},[category,duration])

  return trending.length > 0 ? (
    <div className=' w-full h-screen'>
      
      <div className='px-[5%] w-full flex items-center justify-between'>
      <h1 className=' text-2xl text-zinc-400 font-semibold'>
        <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
        {' '}Trending
        </h1>        

        <div className='flex items-center w-[80%]'>
        <div className='w-[100%]'>
        <Topnav />
        </div>
        <Dropdown title={category} options={['movie','tv','all']} func={(e)=>setCategory(e.target.value)}/>
        <div className='w-[2%] flex'></div>
        <Dropdown title={duration} options={['week','day']} func={(e)=>setDuration(e.target.value)}/>
     
        </div>
        
      </div>
      <Scroll
      dataLength={trending.length}
      next={GetTrending}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}     >
         <Cards data={trending} title={category}/>
      </Scroll>

      </div>
  ): <Loading/>
}

export default Trending