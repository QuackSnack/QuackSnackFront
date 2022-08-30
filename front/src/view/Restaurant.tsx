import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import FoodList from '../component/FoodList'

function Restaurant() {
  const [restaurants, setRestaurants] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/restaurants/')
      .then((res) => {
        setRestaurants(res.data.data)
      })
  }, [])

  return (
    <div className='main-frame'>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <Typography variant='h4'>{restaurant.username}</Typography>
          <Stack direction='row' spacing={2}>
            <FoodList foods={restaurant.articles} title='Articles' />
            <FoodList foods={restaurant.menus} title='Menus' />
          </Stack>
        </div>
      ))}
    </div>
  )
}

export default Restaurant
