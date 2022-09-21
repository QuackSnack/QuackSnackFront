import { ReactElement, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Chip, DialogContentText, Divider, Stack } from '@mui/material'
import { useCurrentContext } from '../plugin/context'
import { Article } from '../interface/Article'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { Menu } from '../interface/Menu'
import { Choice } from '../interface/Choice'
import MenuChoice from './MenuChoice'

function FoodModal(props: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<number>>; food: Article| Menu }): ReactElement {
  const [quantity, setQuantity] = useState(1)
  const { food } = props
  const { open } = props
  const { setOpen } = props
  const { addBasketContent } = useCurrentContext()

  const incrementQuantity = (): void => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = (): void => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(-1)}>
        <div className="food-modal">
          <img src={`/images/${food.image}`} alt="Image not working" />
          <DialogTitle id="scroll-dialog-title">
            {food.name} | {food.price} €
          </DialogTitle>
          <Stack direction="row" spacing={1}>
            {food.tag.map((tag: { id: number; name: string }, index: number) => (
              <Chip key={index} label={tag.name} />
            ))}
          </Stack>
          <DialogContent>
            <DialogContentText>{food.description}</DialogContentText>
            {Object.prototype.hasOwnProperty.call(food, "choice") ? (
              <MenuChoice choice={food.choice}/>
            ) : (null) }
          </DialogContent>
          <Divider />
          <AddCircle onClick={incrementQuantity} />
          <h5>{quantity}</h5>
          <RemoveCircle onClick={decrementQuantity} />
          <DialogActions className="food-modal-buttons">
            <Button onClick={() => addBasketContent(food, quantity)}>Add to basket</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default FoodModal
