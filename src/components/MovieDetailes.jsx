import React, { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'

const MovieDetailes = () => {

  const { info } = useSelector((state) => state.movie)
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removemovie())
    }

  }, [])
  console.log(info)

  return info ? (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path
        })`,
      backgroundPosition: 'top ',
      backgroundSize: 'cover',
    }} className='w-screen h-screen px-[10%]'>
      <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-2xl'>
        <NavLink>
          <i onClick={() => navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line'>
          </i></NavLink>

        <a target='_blank' href={info.details.homepage}><i className="ri-earth-fill"></i></a>
        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-external-link-fill"></i></a>
        <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}><i className="ri-folder-image-fill"></i></a>


      </nav>

      <div className='w-full h-[90vh] flex gap-10'>
      
      <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path || info.details.profile_path || info.details.still_path || info.details.file_path || info.details.logo_path || info.details.still
            }`} alt="" />

      <div>
        {info.watchproviders.flatrate}
      </div>

      </div>

    </div>
  ) : <Loading />
}

export default MovieDetailes