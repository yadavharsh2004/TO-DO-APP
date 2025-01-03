import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row place-content-between p-5 bg-blue-700
    container mx-auto px-6 py-4 items-center justify-between'>
        <div>
          <h1 className=' text-white font-extrabold text-2xl'>
            TO DO APP
          </h1>
        </div>

        <div className='flex flex-row gap-x-20 text-white font-extrabold text-2xl'>
          <NavLink 
          to='/'>
            Home
          </NavLink>
          console.log("Hello");
          <NavLink 
          to='/pastes'>
            Paste
          </NavLink>
        </div>
    </div>
  )
}

export default Navbar