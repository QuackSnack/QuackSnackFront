import { useState, ReactElement, useEffect } from 'react'
import { Tooltip, Typography, Chip, Stack, Fab } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useCurrentContext } from '../plugin/context'
import { Article } from '../interface/Article'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Link } from 'react-router-dom'

function FoodCard(props: { food: Article }): ReactElement {
  const { food } = props
  const { userValid, checkUser, basketContent, handleBasketContent } = useCurrentContext()
  const [selected, setSelected] = useState(basketContent.some((item: { id: number }) => item.id === food.id))

  const handleClick = (): void => {
    handleBasketContent(food)
    if (basketContent.some((item: { id: number }) => item.id === food.id)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }

  return (
    <Card className="food-card" style={{ backgroundColor: 'var(--third-color)' }}>
      <CardMedia component="img" className="food-card-image" image={`/images/${food.image}`} alt="Image not working" />
      {userValid ? (
        <Fab size="small" sx={{ zIndex: 1 }} color="primary" onClick={handleClick} aria-label="add">
          {selected ? <RemoveIcon /> : <AddIcon />}
        </Fab>
      ) : null}
      <CardContent className="food-card-content">
        <Stack direction="row" spacing={1}>
          {food.tag.map((tag: { id: number; name: string }, index: number) => (
            <Chip key={index} label={tag.name} />
          ))}
        </Stack>
        <Link to={`/article/${food.id}`}>
        <Typography variant="h6" className="food-card-name" component="div">
          {food.name}
        </Typography>
        </Link>
        <Typography variant="h6" className="food-card-price" component="div">
          {food.price} €
        </Typography>
          <Typography variant="body2" className="food-card-description" color="text.secondary">
            {food.description}
          </Typography>
      </CardContent>
    </Card>
  )
}

export default FoodCard
