import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './component/NavBar'
import Article from './view/Article'
import Menu from './view/Menu'
import Restaurant from './view/Restaurant'
import Home from './view/Home'
import User from './view/User'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurant' element={<Restaurant />} />
          <Route path='/article' element={<Article />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
