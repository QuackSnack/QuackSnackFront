import React from 'react'
import { Drawer, Switch, Typography, Stack, Divider, ToggleButtonGroup, ToggleButton } from '@mui/material'

function SettingsRightPanel(props: { open: boolean; setOpen: Function }) {
  const { open } = props
  const { setOpen } = props
  const [view, setView] = React.useState('list')

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView)
  }

  return (
    <Drawer anchor='right' open={open} onClose={() => setOpen(!open)}>
      <div className='drawer-panel'>
        <Typography variant='h3'>Settings</Typography>
        <Divider />
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography>Light mode</Typography>
          <Switch defaultChecked />
          <Typography>Dark mode</Typography>
        </Stack>
        <Stack>
          <ToggleButtonGroup orientation='vertical' value={view} exclusive onChange={handleChange}>
            <ToggleButton value='module' aria-label='module'>
              French
            </ToggleButton>
            <ToggleButton value='quilt' aria-label='quilt'>
              English
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </div>
    </Drawer>
  )
}

export default SettingsRightPanel
