import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './store/AppContext.tsx'
import './index.css'
import { AppRouter } from './router.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AppProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AppProvider>
  </React.StrictMode>
)
