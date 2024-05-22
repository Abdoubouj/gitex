import React from 'react'
import logo from "../assets/logo.webp"
const Header = () => {
  return (
    <header className='header_app d-flex justify-content-center align-items-center border-bottom p-3'>
       <img src={logo} width={120} alt="" />
    </header>
  )
}

export default Header
