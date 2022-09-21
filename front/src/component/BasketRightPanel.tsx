import { ReactElement } from 'react'
import { Drawer, Typography, Divider, Button } from '@mui/material'
import { useCurrentContext } from '../plugin/context'
import { RemoveCircle } from '@mui/icons-material/'
import { Link } from 'react-router-dom'

interface ChildProps {
  openPanel: boolean
  setOpenPanel: React.Dispatch<React.SetStateAction<string>>
}

function SettingsRightPanel({ openPanel, setOpenPanel }: ChildProps): ReactElement {
  const { basketContent, removeBasketContent } = useCurrentContext()

  return (
    <Drawer anchor="right" open={openPanel} onClose={() => setOpenPanel('')}>
      <div className="drawer-panel">
        <Typography variant="h3">Basket</Typography>
        <Divider />
        {basketContent
          ? basketContent.map((item: { id: number; name: string; quantity: number }) => (
            <div key={item.id}>
              <p >
                {item.name} x{item.quantity}
              </p>
              <RemoveCircle onClick={() => removeBasketContent(item)}/>
              </div>
            ))
          : null}
          {basketContent ? <Link to="/checkout"><Button>Go to checkout</Button></Link> : null}
      </div>
    </Drawer>
  )
}

export default SettingsRightPanel
