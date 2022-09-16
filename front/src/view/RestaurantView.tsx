import { useState, useEffect, ReactElement } from 'react'
import {useParams} from "react-router-dom"
import request from '../plugin/request'
import { Restaurant } from '../interface/Restaurant'

function RestaurantView(): ReactElement {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
	const {restaurantId} = useParams()

  useEffect(() => {
    request
      .get(`get/restaurant/${restaurantId}`)
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
      <h1>Restaurant</h1>
			{restaurantId}
    </div>
  )
}

export default RestaurantView
