// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import App from './App'
import PWAInstallPrompt from './components/PWA/PWAInstallPrompt'

// Register for PWA updates
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('Service Worker registered:', reg);
    }).catch(err => {
      console.error('Service Worker registration failed:', err);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PWAInstallPrompt />
  </React.StrictMode>
)