import { ReactElement, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './plugin/context'
import NavBar from './component/NavBar'
import HomeView from './view/HomeView'
import UserView from './view/UserView'
import request from './plugin/request'
import NoApiResponseView from './view/NoApiResponseView'
import RestaurantView from './view/RestaurantView'
import ArticleView from './view/ArticleView'

function Main(): ReactElement {
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
              <Route path="/" element={<HomeView />} />
              <Route path="/user" element={<UserView />} />
              <Route path="/restaurant/:restaurantId" element={<RestaurantView />} />
              <Route path="/article/:articleId" element={<ArticleView />} />
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </div>
    )
  } else if (!apiResponse) {
    return (
      <div>
        <NoApiResponseView />
      </div>
    )
  }
}

export default Main
