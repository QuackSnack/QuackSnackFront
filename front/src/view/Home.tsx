/**
 * UNUSED
 */

import { ReactElement } from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import QSLogoTitle from '../asset/logo/QuackLogo_Dark.png'

function Home(): ReactElement {
  const LocationTextField = styled(TextField)({
    '& label': {
      color: 'var(--third-color)'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--third-color)'
      },
      '&:hover fieldset': {
        borderColor: 'var(--third-color)'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--third-color)'
      },
      '& input': {
        color: 'var(--third-color)'
      }
    }
  })

  return (
    <div className="main-frame">
      <img src={QSLogoTitle} alt="QS logo" className="qs-logo-title" />
      <div className="search-field">
        <LocationTextField label="Search around you ..." variant="outlined" />
      </div>
    </div>
  )
}

export default Home
