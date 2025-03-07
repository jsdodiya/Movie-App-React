import React, { useState,useEffect} from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import Cards from './templates/Cards'
import Loading from './Loading'
import Scroll from 'react-infinite-scroll-component'


const Popular = () => {
  document.title = `Movie App | Popular `
  const navigate = useNavigate()
  const [category, setCategory] = useState('movie')
  const [popular, setPopular] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const GetPopular = async () => {
    try {
        const { data } = await axios.get(`${category}/popular?page=${page}`);

        if(data.results.length > 0){
          setPopular((prevstate) => [...prevstate, ...data.results]);
          setPage(page+1)
        }else{
          setHasMore(false)
          
        }

    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};


const refreshhadnler =() => {
  if(popular.length === 0){
    GetPopular()
  }else{
    setPage(1)
    setPopular([])
    GetPopular()
    
  }
}

useEffect(()=>{
  refreshhadnler()
},[category])

  return (popular.length > 0 ? (
    <div className=' w-full h-screen'>
      
      <div className='px-[5%] w-full flex items-center justify-between'>
      <h1 className=' text-2xl text-zinc-400 font-semibold'>
        <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
        {' '}Popular
        </h1>        

        <div className='flex items-center w-[80%]'>
        <div className='w-[100%]'>
        <Topnav />
        </div>
        <Dropdown title={category} options={['movie','tv']} func={(e)=>setCategory(e.target.value)}/>
        
        
     
        </div>
        
      </div>
      <Scroll
      dataLength={popular.length}
      next={GetPopular}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}     >
         <Cards data={popular} title={category}/>
      </Scroll>

      </div>
  ): <Loading/>
  )
}


export default Popular