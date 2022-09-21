import React, { ReactElement, useState } from 'react'
import getCookie from './getCookie'
import request from './request'

const CurrentContext = React.createContext({})

const ContextProvider = ({ children }: any): ReactElement => {
  const CSRFToken = getCookie('X-CSRFToken')
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}
  const basketContent = localStorage.getItem('basketContent') ? JSON.parse(localStorage.getItem('basketContent')) : []
  const [userValid, setUserValid] = useState(true)
  const [snackBarMessage, setSnackBarMessage] = useState('')

  const setSnackBar = (message: string): void => {
    setSnackBarMessage(message)
    setTimeout(function () {
      setSnackBarMessage('')
    }, 3000)
  }

  const checkUser = (): void => {
    if (userData !== null) {
      if (userData.id !== null) {
        request
          .get(`check-user/${userData.id as string}/`)
          .then(() => {
            setUserValid(true)
          })
          .catch(() => {
            setUserValid(false)
          })
      } else {
        setUserValid(false)
      }
    } else {
      setUserValid(false)
    }
  }

  function setUserData(user: object): void {
    localStorage.setItem('userData', JSON.stringify(user))
  }

  function addBasketContent(item: { id: number; name: string }, quantity: number): void {
    const currentBasket: Array<{ id: number; name: string; quantity: number }> = basketContent
    currentBasket.push({
      id: item.id,
      name: item.name,
      quantity: quantity
    })
    localStorage.setItem('basketContent', JSON.stringify(currentBasket))
  }

  function removeBasketContent(item: { id: number; name: string }): void {
    const currentBasket: Array<{ id: number; name: string }> = basketContent
    const alreadyExists = currentBasket.findIndex((object: { id: number; name: string }) => object.id === item.id)
    if (alreadyExists >= 0) {
      currentBasket.splice(alreadyExists, 1)
    }
    localStorage.setItem('basketContent', JSON.stringify(currentBasket))
  }

  return (
    <CurrentContext.Provider
      value={{
        CSRFToken,
        userData,
        basketContent,
        userValid,
        setUserValid,
        checkUser,
        setUserData,
        addBasketContent,
        removeBasketContent,
        snackBarMessage,
        setSnackBar
      }}
    >
      {children}
    </CurrentContext.Provider>
  )
}

const useCurrentContext = (): any => React.useContext(CurrentContext)

export { useCurrentContext, ContextProvider, CurrentContext }
