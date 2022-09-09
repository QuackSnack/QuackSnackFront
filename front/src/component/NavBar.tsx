/* eslint-disable no-console */
import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ManageAccounts, Settings , LogoutOutlined, ShoppingBasketOutlined } from '@mui/icons-material'
import Button from '@mui/material/Button'
import SettingsRightPanel from './SettingsRightPanel'
import BasketRightPanel from './BasketRightPanel'
import { reactContext } from '../plugins/context'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { ReactComponent as QuackSnack } from '../assets/logo/QS_Icon_Dark.svg'
import request from '../plugins/request'

function NavBar() {
  const [openPanel, setOpenPanel] = useState('')
  const [openModal, setOpenModal] = useState('')
  const context: any = useContext(reactContext)

  const logout = () => {
    request
      .post('log-out/')
      .then((res) => {
        console.log(res)
        context.setUserLoggedIn('0')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (context.userLoggedIn === '1') {
    return (
      <nav className='navbar'>
        <Link to='/'>
          <QuackSnack className={useLocation().pathname === '/' ? 'qs-logo active-qs' : 'qs-logo'} />
        </Link>
        <Link className={useLocation().pathname === '/restaurant' ? 'navbar-title active-title' : 'navbar-title'} to='/restaurant'>
          <Typography variant='h4'>Restaurants</Typography>
        </Link>
        <div className='navbar-right'>
          <Link to='/user'>
            <ManageAccounts className={useLocation().pathname === '/user' ? 'navbar-logo active-logo' : 'navbar-logo'} />
          </Link>

          <ShoppingBasketOutlined className={openPanel ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpenPanel('basket')} />
          <BasketRightPanel openPanel={openPanel === 'basket'} setOpenPanel={setOpenPanel} />
          
          <LogoutOutlined className='navbar-logo' onClick={() => logout()} />

          <Settings className={openPanel ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpenPanel('settings')} />
          <SettingsRightPanel openPanel={openPanel === 'settings'} setOpenPanel={setOpenPanel} />

          <SignIn open={openModal === 'signin'} setOpen={setOpenModal} />
          <SignUp open={openModal === 'signup'} setOpen={setOpenModal} />
        </div>
      </nav>
    )
  }
  return (
    <nav className='navbar'>
      <Link to='/'>
        <QuackSnack className={useLocation().pathname === '/' ? 'qs-logo active-qs' : 'qs-logo'} />
      </Link>
      <Link className={useLocation().pathname === '/restaurant' ? 'navbar-title active-title' : 'navbar-title'} to='/restaurant'>
        <Typography variant='h4'>Restaurants</Typography>
      </Link>
      <div className='navbar-right'>
        <div className='sign-button-group'>
          <Button variant='contained' color='primary' disableElevation onClick={() => setOpenModal('signin')}>
            Sign in
          </Button>
          <Button variant='outlined' color='primary' onClick={() => setOpenModal('signup')}>
            Sign up
          </Button>
        </div>
        <Settings className={openPanel ? 'navbar-logo active-logo' : 'navbar-logo'} onClick={() => setOpenPanel('settings')} />
        <SettingsRightPanel openPanel={openPanel === 'settings'} setOpenPanel={setOpenPanel} />
        <SignIn open={openModal === 'signin'} setOpen={setOpenModal} />
        <SignUp open={openModal === 'signup'} setOpen={setOpenModal} />
      </div>
    </nav>
  )
}

export default NavBar
