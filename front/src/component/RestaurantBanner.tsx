import { ReactElement, useEffect, useState } from 'react'
import request from '../plugin/request'

function FoodList(props: {id:number }): ReactElement {
  const { id } = props
  const [restaurant, setRestaurant] = useState({
    username: ''
  })

  useEffect(() => {
    request
      .get(`get/restaurant/${id}/`)
      .then((res) => {
        console.log(res.data.data)
        setRestaurant(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }, [])

  return (
    <div className="food-list">
        <h1>{restaurant.username}</h1>
    </div>
  )
}

export default FoodList
