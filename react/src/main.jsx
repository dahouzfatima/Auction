import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import Objet from './components/Objet.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import 'boxicons/css/boxicons.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
)
