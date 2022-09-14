import React from 'react'
import getCookie from './getCookie'

class QSContext {
  CSRFToken: string

  userLoggedIn: string

  userData: any

  basketContent: any

  constructor() {
    this.CSRFToken = getCookie('X-CSRFToken')
    this.userLoggedIn = localStorage.getItem('userLoggedIn')
    this.userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}
    this.basketContent = localStorage.getItem('basketContent') ? JSON.parse(localStorage.getItem('basketContent')) : []
  }

  setUserLoggedIn(state: string): void {
    localStorage.setItem('userLoggedIn', state)
  }

  setUserData(user: object): void {
    localStorage.setItem('userData', JSON.stringify(user))
  }

  handleBasketContent(item: { id: number; name: string }): void {
    const currentBasket: any = this.basketContent
    const alreadyExists = currentBasket.findIndex((object: { id: number; name: string }) => object.id === item.id)
    if (alreadyExists === -1) {
      currentBasket.push({
        id: item.id,
        name: item.name
      })
      console.log(currentBasket)
      localStorage.setItem('basketContent', JSON.stringify(currentBasket))
    } else {
      currentBasket.splice(alreadyExists, 1)
      console.log(currentBasket)
      localStorage.setItem('basketContent', JSON.stringify(currentBasket))
    }
  }
}

const reactContext = React.createContext(new QSContext())

export { QSContext, reactContext }
