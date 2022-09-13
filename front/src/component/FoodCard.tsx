import { useContext, useState, ReactElement } from 'react'
import { Tooltip, Typography, Chip, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { QSContext, reactContext } from '../plugin/context'
import { Article } from '../interface/Article'

function FoodCard(props: { food: Article }): ReactElement {
  const { food } = props
  const context: QSContext = useContext(reactContext)
  const [selected, setSelected] = useState(context.basketContent.some((item: { id: number }) => item.id === food.id))

  const handleClick = (): void => {
    context.addBasketContent(food)
    if (context.basketContent.some((item: { id: number }) => item.id === food.id)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }

  return (
    <Card className={selected ? 'food-card selected' : 'food-card'} style={{ backgroundColor: 'var(--third-color)' }} onClick={handleClick}>
      <CardMedia component="img" className="food-card-image" image={`/images/${food.image}`} alt="Image not working" />
      <CardContent className="food-card-content">
        <Stack direction="row" spacing={1}>
          {food.tag.map((tag: { id: number; name: string }, index:number) => (
            <Chip key={index} label={tag.name} />
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
