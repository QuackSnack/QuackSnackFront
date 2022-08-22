import React from 'react'
import Stack from '@mui/material/Stack';
import FoodCard from './FoodCard'

function FoodList(props: { foods: object[] }) {
  const { foods } = props

  return (
    <Stack direction="row" spacing={2} className='food-list'>
      {foods.map((food) => (
        <FoodCard food={food}/>
      ))}
    </Stack>
  )
}

export default FoodList
