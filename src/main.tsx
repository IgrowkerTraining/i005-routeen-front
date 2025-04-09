import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './store/AppContext.tsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { AppRouter } from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>
)
