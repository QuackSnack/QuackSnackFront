import { Box, Typography } from '@mui/material'
import { ReactElement } from 'react'
import QuackSnack from '../asset/logo/QuackMaintenance.png'

function NoApiResponseView(): ReactElement {
  return (
    <div className="maintenance">
      <div>
        <img src={QuackSnack} alt="Website in maintenance" />
        <Typography variant="h4">
          <Box sx={{ fontWeight: 'bold', m: 1, fontSize:'45px' }}>Website is under maintenance.</Box>
        </Typography>
        <Typography variant="h4">We will be back quackly!</Typography>
      </div>
    </div>
  )
}

export default NoApiResponseView
