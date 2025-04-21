import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { useAuth } from '../store/AuthContext'
import { useEffect, useState } from 'react'
import getTokenData from '../logic/auth/getTokenData'
import getTrainerInfo from '../logic/trainer/getTrainerInfo'
import getAthleteInfo from '../logic/athlete/getAthleteInfo'

export function Layout() {
  const { user, loading } = useAuth()
  const [userName, setUserName] = useState('')
  const [userPicture, setUserPicture] = useState(
    '/images/users/Imagen_perfil-2.png'
  )

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getTokenData()
      if (tokenData?.role === 'trainer') {
        setUserName(tokenData.name)
        const trainerInfo = await getTrainerInfo({
          id: tokenData.id,
        })
        setUserPicture(trainerInfo.profile_picture_url)
      } else if (tokenData?.role === 'athlete') {
        setUserName(tokenData.name)
        const athleteInfo = await getAthleteInfo({ id: tokenData.id })
        setUserPicture(athleteInfo.profile_picture)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  if (loading) return null // Se puede cambiar por un spinner

  return (
    <>
      {user?.role && (
        <Header
          trainerName={userName}
          userRole={user.role}
          profilePicture={userPicture}
        />
      )}
      <main className="mt-20 px-4">
        <Outlet />
      </main>
    </>
  )
}
