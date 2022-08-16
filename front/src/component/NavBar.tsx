import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { AccountBox, SettingsApplications } from '@mui/icons-material'
import SettingsRightPanel from './SettingsRightPanel'
import { ReactComponent as QuackSnack } from '../logo/QS_Icon_Dark.svg'

function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className='navbar'>
      <Link to='/'>
        <QuackSnack className={useLocation().pathname === '/' ? 'qs-logo active-qs' : 'qs-logo'} />
      </Link>
      <Link className={useLocation().pathname === '/restaurant' ? 'navbar-title active-title' : 'navbar-title'} to='/restaurant'>
        <Typography variant='h4'>Restaurants</Typography>
      </Link>
      <Link className={useLocation().pathname === '/article' ? 'navbar-title active-title' : 'navbar-title'} to='/article'>
        <Typography variant='h4'>Articles</Typography>
      </Link>
      <Link className={useLocation().pathname === '/menu' ? 'navbar-title active-title' : 'navbar-title'} to='/menu'>
      <Typography variant='h4'>Menus</Typography>
      </Link>
      <div className='navbar-right'>
        <Link to='/user'>
          <AccountBox className={useLocation().pathname === '/user' ? 'navbar-logo active-logo' : 'navbar-logo'} />
        </Link>
        <SettingsApplications className={open ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpen(!open)} />
        <SettingsRightPanel open={open} setOpen={setOpen}/>
      </div>
    </nav>
  )
}

export default NavBar
