import { ReactElement, MouseEvent, useState } from 'react'
import { Drawer, Switch, Typography, Stack, Divider, ToggleButtonGroup, ToggleButton } from '@mui/material'

function SettingsRightPanel(props: { openPanel: boolean; setOpenPanel: Function }): ReactElement {
  const { openPanel } = props
  const { setOpenPanel } = props
  const [view, setView] = useState('fr')

  const handleChange = (event: MouseEvent<HTMLElement>, nextView: string): void => {
    if (nextView !== null) {
      setView(nextView)
    }
  }

  return (
    <Drawer anchor="right" open={openPanel} onClose={() => setOpenPanel(!openPanel)}>
      <div className="drawer-panel">
        <Typography variant="h3">Settings</Typography>
        <Divider />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Light mode</Typography>
          <Switch defaultChecked />
          <Typography>Dark mode</Typography>
        </Stack>
        <Stack>
          <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
            <ToggleButton color="primary" value="fr">
              Français
            </ToggleButton>
            <ToggleButton color="primary" value="en">
              English
            </ToggleButton>
            <ToggleButton color="primary" value="ot">
              Some other language
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </div>
    </Drawer>
  )
}

export default SettingsRightPanel
