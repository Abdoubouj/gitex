import React from 'react'
import logo from "../assets/logo.png"
const Header = () => {
  return (
    <header className='header_app d-flex justify-content-center align-items-center border-bottom'>
       <img src={logo} width={120} alt="" />
    </header>
  )
}

export default Header
