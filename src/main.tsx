import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/App.css'
import { MantineProvider } from '@mantine/core'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js').then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

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
