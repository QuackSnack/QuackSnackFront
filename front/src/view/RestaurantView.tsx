import { useState, useEffect, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import request from '../plugin/request'
import { useCurrentContext } from '../plugin/context'

function RestaurantView(): ReactElement {
  const { setSnackBar } = useCurrentContext()
  const [restaurant, setRestaurant] = useState({
    username: ''
  })
  const { restaurantId } = useParams()

  useEffect(() => {
    request
      .get(`get/restaurant/${restaurantId}/`)
      .then((res) => {
        setRestaurant(res.data.data)
      })
      .catch((err) => {
        setSnackBar(err.response.data.message)
      })
  }, [])

  return (
    <div className="main-frame">
      <h1>Restaurant</h1>
      <h1>{restaurantId}</h1>
      <h1>{restaurant.username}</h1>
    </div>
  )
}

export default RestaurantView
