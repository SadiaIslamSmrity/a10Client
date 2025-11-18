import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

const Mainlayout = () => {
  return (
    <div>
        <Navbar/> 
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Mainlayout