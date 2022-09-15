import { ReactElement, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QSContext, reactContext } from './plugin/context'
import NavBar from './component/NavBar'
import Foods from './view/RestaurantView'
import User from './view/UserView'
import request from './plugin/request'
import NoApiResponse from './view/NoApiResponseView'

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
        Ping()
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const context = useMemo(() => new QSContext(), [])

  if (apiResponse) {
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
  } else if (!apiResponse) {
    return (
      <div>
        <NoApiResponse />
      </div>
    )
  }
}

export default App
