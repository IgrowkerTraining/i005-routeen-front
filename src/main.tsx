import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './store/AppContext.tsx'
import './index.css'
import { AppRouter } from './router.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
import { RoutineProvider } from './store/RoutineContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RoutinesDProvider } from './store/RoutinesContextD.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <RoutineProvider>
          <RoutinesDProvider>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </RoutinesDProvider>
        </RoutineProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)
