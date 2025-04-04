import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { useState, useEffect } from 'react'

export function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'trainer' | 'athlete' | null>(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole') as
      | 'trainer'
      | 'athlete'
      | null
    const name = localStorage.getItem('userName') || ''

    if (token && role) {
      setIsLoggedIn(true)
      setUserRole(role)
      setUserName(name)
    }
  }, [])

  if (isLoggedIn && userRole) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-400">
        <Header trainerName={userName} />

        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 p-4 rounded-lg shadow-sm bg-notwhite-400">
              <h1 className="text-2xl tracking-wide font-bebas text-primary-400">
                ¡Bienvenido, {userName}!
              </h1>

              {userRole === 'trainer' ? (
                <p className="mt-1 font-sans text-secondary-400">
                  Gestiona tus alumnos y rutinas desde aquí.
                </p>
              ) : (
                <p className="mt-1 font-sans text-secondary-400">
                  Revisa tus rutinas y progreso con tu entrenador.
                </p>
              )}
            </div>

            {/* <Outlet /> */}
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return <Outlet />
}
