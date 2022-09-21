import { useState, useEffect, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import request from '../plugin/request'
import { useCurrentContext } from '../plugin/context'
import { Stack } from '@mui/material'
import RestaurantBanner from '../component/RestaurantBanner'

function MenuView(): ReactElement {
  const { setSnackBar } = useCurrentContext()
  const [menu, setMenu] = useState({
    owner: 0,
    id: 0,
    tag: [],
    name: '',
    image: '',
    price: '',
    description: ''
  })
  const { menuId } = useParams()

  useEffect(() => {
    request
      .get(`get/menu/${menuId}/`)
      .then((res) => {
        setMenu(res.data.data)
      })
      .catch((err) => {
        setSnackBar(err.response.data.message)
      })
  }, [])

  return (
    <div className="main-frame">
      <Stack spacing={20} direction="row">
        <div>
        <h1>Owner ID:{menu.owner}</h1>
        <h1>ID:{menu.id}</h1>
        <h1>Tags:</h1>
        {menu.tag.map((tag: { id: number; name: string }, index: number) => (
          <h5 key={index}>{tag.name}</h5>
        ))}
        <h1>Name:{menu.name}</h1>
        <h1>Price:{menu.price}</h1>
        <h1>Description:{menu.description}</h1>
        <img height={200} src={`/images/${menu.image}`} alt={menu.image}></img>
        </div>
        <div>
          {menu.owner === 0 ? (null) : <RestaurantBanner id={menu.owner}/>}
        </div>
      </Stack>
    </div>
  )
}

export default MenuView
