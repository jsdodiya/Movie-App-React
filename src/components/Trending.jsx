import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from '../components/Loading'

const Trending = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [duration, setDuration] = useState('day')
  const [trending, setTrending] = useState(null)

  const GetTrending = async () => {
    try {
        const { data } = await axios.get(`/trending/${category}/${duration}`);

        setTrending(data.results);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};
console.log(trending)

useEffect(()=>{
   GetTrending()
},[category,duration])

  return trending ? (
    <div className='px-[3%] w-full h-screen'>
      
      <div className=' w-full flex items-center justify-between'>
      <h1 className=' text-2xl text-zinc-400 font-semibold'>
        <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
        {' '}Trending
        </h1>        

        <div className='flex items-center w-[80%]'>
        <div className='w-[100%]'>
        <Topnav />
        </div>
        <Dropdown title="Category" options={['movie','tv','all']} func={(e)=>setCategory(e.target.value)}/>
        <div className='w-[2%] flex'></div>
        <Dropdown title="Duration" options={['week','day']} func={(e)=>setDuration(e.target.value)}/>
     
        </div>
        
      </div>
      
      <Cards data={trending}/>

      </div>
  ): <Loading/>
}

export default Trending