import { FormEvent, ReactElement, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Chip, DialogContentText, Divider, Stack, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useCurrentContext } from '../plugin/context'
import { Article } from '../interface/Article'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { Menu } from '../interface/Menu'
import { Choice } from '../interface/Choice'

function FoodModal(props: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<number>>; food: Article | Menu }): ReactElement {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(event.target)          

  }

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(-1)}>
        <div className="food-modal">
          <img src={`/images/${food.image}`} alt="Image not working" />
          <DialogTitle id="scroll-dialog-title">
            {food.name} | {food.price} €
          </DialogTitle>
          <DialogContentText>{food.description}</DialogContentText>
          <Stack direction="row" spacing={1}>
            {food.tag.map((tag: { id: number; name: string }, index: number) => (
              <Chip key={index} label={tag.name} />
            ))}
          </Stack>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Divider />
              {Object.prototype.hasOwnProperty.call(food, 'choice') ? (
                <div>
                  {food.choice.map((c: Choice) => {
                    return (
                      <div key={c.id}>
                        <h3>{c.name}</h3>
                        <RadioGroup key={c.id}>
                          {c.possibilities.map((possibility) => {
                            return <FormControlLabel value={possibility.id} control={<Radio required />} key={possibility.id} label={possibility.name} />
                          })}
                        </RadioGroup>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <RadioGroup defaultValue={food.id}>
                  <FormControlLabel value={food.id} control={<Radio required />} label={food.name} />
                </RadioGroup>
              )}
            </DialogContent>
            <Divider />
            <DialogActions className="food-modal-buttons">
              <RemoveCircle onClick={decrementQuantity} />
              <h5>{quantity}</h5>
              <AddCircle onClick={incrementQuantity} />
              <Button type='submit'>Add to basket</Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  )
}

export default FoodModal
