import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'
import FoodCard from '../component/FoodCard'

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
        console.log(res.data.data)
        setRestaurants(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='frame'>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <Typography variant='h4'>{restaurant.username}</Typography>
          <div>
            <FoodCard />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Restaurant
