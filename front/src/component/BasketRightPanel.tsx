import { useContext, ReactElement } from 'react'
import { Drawer, Typography, Divider } from '@mui/material'
import { reactContext } from '../plugins/context'

function SettingsRightPanel(props: { openPanel: boolean; setOpenPanel: Function }): ReactElement {
  const { openPanel } = props
  const { setOpenPanel } = props
  const context: any = useContext(reactContext)

  return (
    <Drawer anchor="right" open={openPanel} onClose={() => setOpenPanel(!openPanel)}>
      <div className="drawer-panel">
        <Typography variant="h3">Basket</Typography>
        <Divider />
        {context.basketContent ? context.basketContent.map((item: any) => <p key={item.id}>{item.name}</p>) : null}
      </div>
    </Drawer>
  )
}

export default SettingsRightPanel
