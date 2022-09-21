import { Article } from './Article'
import { Menu } from './Menu'

export interface Restaurant {
  id: number
  username: string
  articles: Article[]
  menus: Menu[]
}
