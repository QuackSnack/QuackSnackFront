import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'


const theme = createTheme({
  palette: {
    primary: {
      main: '#e0fbfc',
      contrastText: '#293241',
    },
    secondary: {
      main: '#293241',
      contrastText: '#e0fbfc',
    },
    success: {
      main: '#98c1d9',
      contrastText: '#293241',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
)
