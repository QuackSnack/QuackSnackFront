import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import request from '../plugins/request'
import FoodList from '../component/FoodList'

function Restaurant() {
  const [restaurants, setRestaurants] = useState<any[]>([])

  useEffect(() => {
    request
      .get('get-all/restaurant/')
      .then((res) => {
        setRestaurants(res.data.data)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
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
