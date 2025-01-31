import React from 'react'
import NotFound from '../../public/404.gif'

const NotFoundPage = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='h-[50%] object-cover' src={NotFound} alt='404'/>
    </div>
  )
}

export default NotFoundPage