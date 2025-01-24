import React, { useState,useEffect} from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'


const Popular = () => {
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

  return (
    <div>Popular</div>
  )
}

export default Popular