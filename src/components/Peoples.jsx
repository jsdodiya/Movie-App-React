import React, { useState,useEffect} from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import Cards from './templates/Cards'
import Loading from './Loading'
import Scroll from 'react-infinite-scroll-component'

const Peoples = () => {

  document.title = `Movie App | Tv Shows `
      const navigate = useNavigate()
      const [category, setCategory] = useState('popular')
      const [peoples, setPeoples] = useState([])
      const [page, setPage] = useState(1)
      const [hasMore, setHasMore] = useState(true)

      const GetPeoples = async () => {
        try {
            const { data } = await axios.get(`/person/popular?page=${page}`);
    
            if(data.results.length > 0){
              setPeoples((prevstate) => [...prevstate, ...data.results]);
              setPage(page+1)
            }else{
              setHasMore(false)
              
            }
    
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    
    
    const refreshhadnler =() => {
      if(peoples.length === 0){
        GetPeoples()
      }else{
        setPage(1)
        setPeoples([])
        GetPeoples()
        
      }
    }
    
    useEffect(()=>{
      refreshhadnler()
    },[category])
    console.log(peoples)

    return (peoples.length > 0 ? (
      <div className=' w-full h-screen'>
        
        <div className='px-[5%] w-full flex items-center justify-between'>
        <h1 className=' text-2xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
          {' '}Peoples
          </h1>        
  
          <div className='flex items-center w-[80%]'>
          <div className='w-[100%]'>
          <Topnav />
          </div>
          {/* <Dropdown title={category} options={['airing_today','on_the_air','top_rated','popular']} func={(e)=>setCategory(e.target.value)}/> */}
          
          
       
          </div>
          
        </div>
        <Scroll
        dataLength={peoples.length}
        next={GetPeoples}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}     >
           <Cards data={peoples} title={category}/>
        </Scroll>
  
        </div>
    ): <Loading/>
    )
  }
  
export default Peoples