import { useContext, useState, ReactElement } from 'react'
import { Tooltip, Typography, Chip, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { reactContext } from '../plugins/context'

function FoodCard(props: {
  food: {
    id: number
    image: string
    tag: any[]
    name: string
    price: number
    description: string
  }
}): ReactElement {
  const { food } = props
  const context: any = useContext(reactContext)
  const [selected, setSelected] = useState(context.basketContent.some((item: any) => item.id === food.id))

  const handleClick = (): void => {
    context.addBasketContent(food)
    if (context.basketContent.some((item: any) => item.id === food.id)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }

  return (
    <Card raised={selected} className="food-card" style={{ backgroundColor: 'var(--third-color)' }} onClick={handleClick}>
      <CardMedia component="img" className="food-card-image" image={`/images/${food.image}`} alt="Image not working" />
      <CardContent className="food-card-content">
        <Stack direction="row" spacing={1}>
          {food.tag.map((t: { name: string }, index: number) => (
            <Chip key={index} label={t.name} />
          ))}
        </Stack>
        <Typography variant="h6" className="food-card-name" component="div">
          {food.name}
        </Typography>
        <Typography variant="h6" className="food-card-price" component="div">
          {food.price} €
        </Typography>
        <Tooltip title={<Typography variant="subtitle1">{food.description}</Typography>} arrow>
          <Typography variant="body2" className="food-card-description" color="text.secondary">
            {food.description}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  )
}

export default FoodCard
