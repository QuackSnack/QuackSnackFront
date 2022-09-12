import { useContext, ReactElement } from 'react'
import { Drawer, Typography, Divider } from '@mui/material'
import { reactContext } from '../plugins/context'

interface ChildProps {
  openPanel: boolean
  setOpenPanel: React.Dispatch<React.SetStateAction<string>>
}

function SettingsRightPanel({ openPanel, setOpenPanel }: ChildProps): ReactElement {
  const context: any = useContext(reactContext)

  return (
    <Drawer anchor="right" open={openPanel} onClose={() => setOpenPanel('')}>
      <div className="drawer-panel">
        <Typography variant="h3">Basket</Typography>
        <Divider />
        {context.basketContent ? context.basketContent.map((item: any) => <p key={item.id}>{item.name}</p>) : null}
      </div>
    </Drawer>
  )
}

export default SettingsRightPanel
