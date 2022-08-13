import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#e0fbfc',
      contrastText: '#ffffff',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
