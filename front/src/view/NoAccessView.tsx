import { Box, Typography } from '@mui/material'
import { ReactElement } from 'react'
import QuackSnack from '../asset/logo/Quack404.png'

function NoAccessView(props: { message: string }): ReactElement {
  const { message } = props
  return (
    <div className="maintenance">
      <div>
        <img src={QuackSnack} alt="Website in maintenance" />
        <Typography variant="h4">
          <Box sx={{ fontWeight: 'bold', m: 1, fontSize: '45px' }}>Something went wrong.</Box>
        </Typography>
        <Typography variant="h4">{message}</Typography>
      </div>
    </div>
  )
}

export default NoAccessView
