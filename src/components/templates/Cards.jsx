import React from 'react'
import { NavLink } from 'react-router-dom'

const Cards = ({data}) => {
  return (
    <div>
        {data.map((c,i)=> <NavLink key={i}>
        <div>
        {c.name|| c.title || c.original_name || c.original_title || 'Untitled'}
        </div>
        </NavLink>)}
    </div>
  )
}

export default Cards