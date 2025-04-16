import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { useAuth } from '../store/AuthContext'
import { useEffect, useState } from 'react'
import getTokenData from '../logic/auth/getTokenData'

export function Layout() {
  const { user, loading } = useAuth()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getTokenData()
      if (tokenData?.name) {
        setUserName(tokenData.name)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  if (loading) return null // Se puede cambiar por un spinner

  return (
    <>
      {user?.role && <Header trainerName={userName} userRole={user.role} />}
      <Outlet />
    </>
  )
}
