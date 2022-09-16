import { ReactElement, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './plugin/context'
import NavBar from './component/NavBar'
import Home from './view/HomeView'
import User from './view/UserView'
import request from './plugin/request'
import NoApiResponse from './view/NoApiResponseView'
import Restaurant from './view/RestaurantView'

function App(): ReactElement {
  const [apiResponse, setApiResponse] = useState(true)

  function Ping(): void {
    request
      .post('ping/')
      .then((res) => {
        if (res.data.message === 'pong') {
          setApiResponse(true)
          
          request.defaults.xsrfHeaderName = 'X-CSRFToken'
          request.defaults.xsrfCookieName = 'csrftoken'
          request.defaults.withCredentials = true
          void request.get('tokenCSRF/')
          
        }
      })
      .catch(() => {
        setApiResponse(false)
      })
  }

  useEffect(() => {
    Ping()
    const interval = setInterval(() => {
      if (!apiResponse) {
        Ping()
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  if (apiResponse) {
    return (
      <div>
        <ContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </div>
    )
  } else if (!apiResponse) {
    return (
      <div>
        <NoApiResponse />
      </div>
    )
  }
}

export default App
