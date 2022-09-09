import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { Context, reactContext } from './plugins/context'
import NavBar from './component/NavBar'
import Restaurant from './view/Restaurant'
import Home from './view/Home'
import User from './view/User'

function App() {

  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.withCredentials = true
  axios.get('http://localhost:8000/tokenCSRF/')

  const context = useMemo(() => (new Context()), []);

  return (
    <div>
      <reactContext.Provider value={context}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/restaurant' element={<Restaurant />} />
            <Route path='/user' element={<User />} />
          </Routes>
        </BrowserRouter>
      </reactContext.Provider>
    </div>
  )
}

export default App
