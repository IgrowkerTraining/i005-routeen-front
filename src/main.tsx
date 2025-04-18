import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './store/AppContext.tsx'
import './index.css'
import { AppRouter } from './router.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
import { RoutinesDProvider } from './store/RoutinesContextD.tsx'
import { RoutineProvider } from './store/RoutineContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RoutineProvider>
      <AuthProvider>
        <RoutinesDProvider>
          <AppRouter />
        </RoutinesDProvider>
      </AuthProvider>
      </RoutineProvider>
    </AppProvider>
  </React.StrictMode>
)
