import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { AccountBox, SettingsApplications } from '@mui/icons-material'
import Button from '@mui/material/Button'
import SettingsRightPanel from './SettingsRightPanel'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { ReactComponent as QuackSnack } from '../assets/logo/QS_Icon_Dark.svg'

function NavBar() {
  const [openPanel, setOpenPanel] = useState(false)
  const [openModal, setOpenModal] = useState('')
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  
  return (
    <nav className='navbar'>
      <Link to='/'>
        <QuackSnack className={useLocation().pathname === '/' ? 'qs-logo active-qs' : 'qs-logo'} />
      </Link>
      <Link className={useLocation().pathname === '/restaurant' ? 'navbar-title active-title' : 'navbar-title'} to='/restaurant'>
        <Typography variant='h4'>Restaurants</Typography>
      </Link>
      <div className='navbar-right'>
        {isLoggedIn ? (
          <Link to='/user'>
            <AccountBox className={useLocation().pathname === '/user' ? 'navbar-logo active-logo' : 'navbar-logo'} />
          </Link>
        ) : (
          <div className='sign-button-group'>
            <Button variant='contained' color="primary" disableElevation onClick={() => setOpenModal('signin')}>Sign in</Button>
            <Button variant='outlined' color="primary" onClick={() => setOpenModal('signup')}>Sign up</Button>
          </div>
        )}
        <SettingsApplications className={openPanel ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpenPanel(!openPanel)} />
        <SettingsRightPanel openPanel={openPanel} setOpenPanel={setOpenPanel} />
        <SignIn open={openModal === 'signin'} setOpen={setOpenModal}/>
        <SignUp open={openModal === 'signup'} setOpen={setOpenModal}/>
      </div>
    </nav>
  )
}

export default NavBar
