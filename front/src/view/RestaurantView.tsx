import { useState, useEffect, ReactElement } from 'react'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import request from '../plugin/request'
import FoodList from '../component/FoodList'
import { Restaurant } from '../interface/Restaurant'

function RestaurantView(): ReactElement {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

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
    <div className="main-frame">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <Typography variant="h4">{restaurant.username}</Typography>
          <Stack direction="row" spacing={2}>
            <FoodList foods={restaurant.articles} title="Articles" />
          </Stack>
        </div>
      ))}
    </div>
  )
}

export default RestaurantView
