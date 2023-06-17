import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/App.css'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ primaryShade: { light: 6, dark: 8 } }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
