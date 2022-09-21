import { useState, ReactElement } from 'react'
import { Typography, Chip, Stack, Fab } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useCurrentContext } from '../plugin/context'
import { Article } from '../interface/Article'
import { Link } from 'react-router-dom'
import FoodModal from './FoodModal'
import { Menu } from '../interface/Menu'

function FoodCard(props: { food: Article | Menu }): ReactElement {
  const { food } = props
  const { basketContent } = useCurrentContext()
  const [selected, setSelected] = useState(basketContent.some((item: { id: number }) => item.id === food.id))
  const [openModal, setOpenModal] = useState(-1)

  return (
    <div>
      <Card className="food-card" style={{ backgroundColor: 'var(--third-color)' }} onClick={() => setOpenModal(food.id)}>
        <CardMedia component="img" className="food-card-image" image={`/images/${food.image}`} alt="Image not working" />
        <CardContent className="food-card-content">
          <Stack direction="row" spacing={1}>
            {food.tag.map((tag: { id: number; name: string }, index: number) => (
              <Chip key={index} label={tag.name} />
            ))}
          </Stack>
          <Link to={Object.prototype.hasOwnProperty.call(food, "choice") ? `/menu/${food.id}` : `/article/${food.id}`}>
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
      <FoodModal open={openModal === food.id} setOpen={setOpenModal} food={food} />
    </div>
  )
}

export default FoodCard
