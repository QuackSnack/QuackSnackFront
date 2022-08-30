import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import NavBar from './component/NavBar'
import Restaurant from './view/Restaurant'
import Home from './view/Home'
import User from './view/User'

function App() {
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.withCredentials = true
  axios.get('http://127.0.0.1:8000/tokenCSRF/').then((res: any) => {
    const cookies = new Cookies();
    cookies.get('csrftoken', res.data.token)
  })

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurant' element={<Restaurant />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
