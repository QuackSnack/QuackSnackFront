import { ReactElement, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { QSContext, reactContext } from './plugin/context'
import NavBar from './component/NavBar'
import Foods from './view/Foods'
import User from './view/User'

function App(): ReactElement {
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.withCredentials = true
  void axios.get('http://localhost:8000/tokenCSRF/')

  const context = useMemo(() => new QSContext(), [])

  return (
    <div>
      <reactContext.Provider value={context}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Foods />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </BrowserRouter>
      </reactContext.Provider>
    </div>
  )
}

export default App
