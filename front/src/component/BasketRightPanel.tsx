import { ReactElement } from 'react'
import { Drawer, Typography, Divider } from '@mui/material'
import { useCurrentContext } from '../plugin/context'

interface ChildProps {
  openPanel: boolean
  setOpenPanel: React.Dispatch<React.SetStateAction<string>>
}

function SettingsRightPanel({ openPanel, setOpenPanel }: ChildProps): ReactElement {
  const { basketContent } = useCurrentContext()

  return (
    <Drawer anchor="right" open={openPanel} onClose={() => setOpenPanel('')}>
      <div className="drawer-panel">
        <Typography variant="h3">Basket</Typography>
        <Divider />
        {basketContent ? basketContent.map((item: { id: number; name: string }) => <p key={item.id}>{item.name}</p>) : null}
      </div>
    </Drawer>
  )
}

export default SettingsRightPanel
