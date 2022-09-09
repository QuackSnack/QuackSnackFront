import React from 'react'
import getCookie from './getCookie'



class Context {
  CSRFToken: string

  userLoggedIn: string

  basketContent: any

  constructor() {
    this.CSRFToken = getCookie('X-CSRFToken')
    this.userLoggedIn = localStorage.getItem('userLoggedIn')
    this.basketContent = localStorage.getItem('basketContent') ? JSON.parse(localStorage.getItem('basketContent')) : []
  }

  // eslint-disable-next-line class-methods-use-this
  setUserLoggedIn(state: string) {
    localStorage.setItem('userLoggedIn', state)
  }

  addBasketContent(item: { id: number; name: string }) {
    const currentBasket: any = this.basketContent
    const alreadyExists = currentBasket.findIndex((object: { id: number; name: string }) => object.id === item.id)
    if (alreadyExists === -1) {
      currentBasket.push({
        id: item.id,
        name: item.name,
      })
      // eslint-disable-next-line no-console
      console.log(currentBasket)
      localStorage.setItem('basketContent', JSON.stringify(currentBasket))
    } else {
      currentBasket.splice(alreadyExists, 1)
      // eslint-disable-next-line no-console
      console.log(currentBasket)
      localStorage.setItem('basketContent', JSON.stringify(currentBasket))
    }
  }

  
}

const reactContext = React.createContext({})

export { Context, reactContext }
