import { useState, useEffect, ReactElement } from 'react'
import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import request from '../plugin/request'
import FoodList from '../component/FoodList'
import { Restaurant } from '../interface/Restaurant'
import { useCurrentContext } from '../plugin/context'
import { Link } from 'react-router-dom'

function HomeView(): ReactElement {
  const { setSnackBar } = useCurrentContext()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    request
      .get('get/restaurant-and-articles/')
      .then((res) => {
        setRestaurants(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        setSnackBar(err.response.data.message)
      })
  }, [])

  return (
    <div className="main-frame">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <Link to={`/restaurant/${restaurant.id}`}>
            <Typography variant="h4">{restaurant.username} </Typography>
          </Link>
          <Stack direction="row" spacing={2}>
            <FoodList foods={restaurant.articles} title="Articles" />
          </Stack>
        </div>
      ))}
    </div>
  )
}

export default HomeView
