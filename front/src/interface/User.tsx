import { Article } from './Article'
import { Menu } from './Menu'

export interface User {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  town: string
  country: string
  street: string
  avatar: string
  banner: string
  role: number
  articles: Article[]
  menus: Menu[]
}
