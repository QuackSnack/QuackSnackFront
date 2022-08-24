import React from 'react'
import { Tooltip, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function FoodCard(props: { food: any }) {
  const { food } = props
  const description =
    'articles' in food
      ? food.articles.map((article: any, index: number) => {
          if (index + 1 === food.articles.length) {
            return `and ${article.name}.`
          }
          return `${article.name}, `
        })
      : food.description

  return (
    <Card className='food-card' style={{backgroundColor: "var(--third-color)"}}>
      <CardMedia component='img' className='food-card-image' image={`/images/${food.image}`} alt='Image not working' />
      <CardContent className='food-card-content'>
        <Typography variant='h6' className='food-card-name' component='div'>
          {food.name}
        </Typography>
        <Typography variant='h6' className='food-card-price' component='div'>
          {food.price} €
        </Typography>
        <Tooltip title={<Typography variant='subtitle1'>{description}</Typography>} arrow>
          <Typography variant='body2' className='food-card-description' color='text.secondary'>
            {description}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  )
}

export default FoodCard
