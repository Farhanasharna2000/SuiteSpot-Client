import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './Hook/UseTheme'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' reverseOrder={false} />
      </ThemeProvider>
    </AuthProvider>
    
  </React.StrictMode>
)
