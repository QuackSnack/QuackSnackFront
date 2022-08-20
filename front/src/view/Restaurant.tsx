import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div>
      <h1>Restaurant</h1>
      <div>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.username}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Restaurant
