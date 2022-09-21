import { Article } from './Article'

export interface Choice {
  id: number
  name: string
  possibilities: Article[]
}
