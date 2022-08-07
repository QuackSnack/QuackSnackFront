import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './component/NavBar'
import Article from './view/Article'
import Menu from './view/Menu'
import Restaurant from './view/Restaurant'
import Home from './view/Home'

function App() {
  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurant' element={<Restaurant />} />
          <Route path='/article' element={<Article />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
