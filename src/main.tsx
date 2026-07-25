import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.DEV) {
      // Avoid stale cached index/assets during local development.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });

      caches.keys().then((keys) => {
        keys.forEach((key) => {
          if (key.includes('agenda-timer-app-cache')) {
            caches.delete(key);
          }
        });
      });

      return;
    }

    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      (err) => {
        console.log('ServiceWorker registration failed: ', err);
      },
    );
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={{ primaryShade: { light: 6, dark: 8 } }}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
