import { ReactElement } from 'react'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import FoodCard from './FoodCard'
import { Article } from '../interface/Article'

function FoodList(this: ReactElement, props: { foods: Article[]}): ReactElement {
  const { foods } = props

  return (
    <div className="food-list" >
      <Stack direction="row" spacing={2}>
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </Stack>
    </div>
  )
}

export default FoodList
