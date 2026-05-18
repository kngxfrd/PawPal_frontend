import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { APIProvider } from '@vis.gl/react-google-maps'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <APIProvider apiKey="AIzaSyBERSdZc3qwb_yrq319GczgtW41gO9lYBg">
      <App />
    </APIProvider>
    </BrowserRouter>
  </StrictMode>,
)
