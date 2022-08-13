import React from 'react'
import { TextField } from '@mui/material'
import QSLogoTitle from '../logo/QuackLogo_Dark.png'

function Home() {
  return (
    <div className='main-frame'>
      <img src={QSLogoTitle} alt='QS logo' className='qs-logo-title'/>
      <div className='search-field'>
      <TextField color='primary' label="Search around you ..." variant="outlined" />
      </div>
    </div>
  )
}

export default Home
