import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'
import FoodList from '../component/FoodList'

function Restaurant() {
  const [restaurants, setRestaurants] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/restaurants/', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setRestaurants(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='main-frame'>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <Typography variant='h3'>{restaurant.username}</Typography>
          <Typography variant='h5'>Articles</Typography>
          <FoodList foods={restaurant.articles} />
          <Typography variant='h5'>Menus</Typography>
          <FoodList foods={restaurant.menus} />
        </div>
      ))}
    </div>
  )
}

export default Restaurant
