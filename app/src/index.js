import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './reset.css'
import App from './components/app/app'
import { ThemeProvider } from '@material-ui/styles'
import theme from './styles/theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
