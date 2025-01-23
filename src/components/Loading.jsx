import React from 'react'
import loader from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-[white]'>
        <img className='w-auto h-auto' src={loader} alt="" />
    </div>
  )
}

export default Loading