import ReactDOM from 'react-dom/client'
import './css/index.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff'
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
