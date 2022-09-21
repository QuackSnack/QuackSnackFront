import { Choice } from './Choice'
import { Tag } from './Tag'

export interface Menu {
  id: number
  tag: Tag[]
  name: string
  image: string
  price: number
  description: string
  owner: number
  choice: Choice[]
}
