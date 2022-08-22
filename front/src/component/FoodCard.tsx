import React from 'react'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function FoodCard(props: { food: any }) {
  const { food } = props

  return (
    <Card className='food-card'>
      <CardMedia component='img' className='food-card-image' image={`/images/${food.image}`} alt='Image not working' />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {food.name} | {food.price} €
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {food.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FoodCard
