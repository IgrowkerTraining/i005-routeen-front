import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { useState, useEffect } from 'react'
import getTokenData from '../logic/auth/getTokenData'

export function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'trainer' | 'athlete' | null>(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getTokenData()

      if (tokenData?.role && tokenData?.name) {
        setIsLoggedIn(true)
        setUserRole(tokenData.role)
        setUserName(tokenData.name)
      }
    }

    fetchData()
  }, [])

  if (isLoggedIn && userRole) {
    return (
      <>
        <Header trainerName={userName} />

        <Outlet />
      </>
    )
  }

  return <Outlet />
}
