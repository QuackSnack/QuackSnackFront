/* eslint-disable react/no-this-in-sfc */
import React, { useRef } from 'react'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import FoodCard from './FoodCard'


function FoodList(this: any, props: { foods: object[]; title: string }) {
  const { foods } = props
  const { title } = props
  const scrollRef = useRef(null)
  const onWheel = (e:any) => {
    e.preventDefault()
    const container = scrollRef.current
    const containerScrollPosition = scrollRef.current.scrollLeft

    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    })
  }


  return (
    <div className='food-list' ref={scrollRef} onWheel={onWheel}>
      <Typography variant='h5'>{title}</Typography>
      <Stack direction='row' spacing={2}>
        {foods.map((food: any) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </Stack>
    </div>
  )
}

export default FoodList
