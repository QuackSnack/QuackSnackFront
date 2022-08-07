import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SVGIcon from "../logo/icon.svg"

function NavBar() {
  return (
    <nav className='navbar'>
      <Link to='/'><img className={useLocation().pathname === '/' ? 'navbar-logo active-logo' : 'navbar-logo'} src={SVGIcon} alt="test"/></Link>
      <Link className={useLocation().pathname === '/restaurant' ? 'navbar-title active-title' : 'navbar-title'} to='/restaurant'>Restaurants</Link>
      <Link className={useLocation().pathname === '/article' ? 'navbar-title active-title' : 'navbar-title'} to='/article'>Articles</Link>
      <Link className={useLocation().pathname === '/menu' ? 'navbar-title active-title' : 'navbar-title'} to='/menu'>Menus</Link>
    </nav>    
  )
}

export default NavBar
