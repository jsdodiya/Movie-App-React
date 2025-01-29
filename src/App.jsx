import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import TvShows from './components/TvShows'
import Peoples from './components/Peoples'
import MovieDetailes from './components/MovieDetailes'
import TvDetailes from './components/TvDetailes'
import PersonDetailes from './components/PersonDetailes'

const App = () => {
  return (
    <div className='bg-[#1F1E24]  w-screen h-screen flex'>
  
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/trending" element={<Trending />} />
  <Route path="/popular" element={<Popular />} />
  <Route path="/movie" element={<Movies />} />
  <Route path="/movie/details/:id" element={<MovieDetailes />} />
  <Route path="/tv" element={<TvShows />} />
  <Route path="/tv/details/:id" element={<TvDetailes />} />
  <Route path="/person" element={<Peoples />} />
  <Route path="/person/details/:id" element={<PersonDetailes />} />
</Routes>

  

      
    </div>
  )
}

export default App