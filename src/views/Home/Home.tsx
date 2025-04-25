import { useAuth } from '../../store/AuthContext'
import HomeAthlete from './HomeAthlete'
import HomeTrainer from './HomeTrainer'
import { Loading } from '../Loading/Loading'

export default function Home() {
  const { user, loading } = useAuth()
  if (loading) return <Loading />

  if (!user) return null

  return (
    <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-start sm:justify-center p-4">
      <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8 sm:min-h-[80vh]">

      <main className="flex flex-col  pb-2 gap-6 sm:px-0">
          {user?.role === 'trainer' ? <HomeTrainer /> : <HomeAthlete />}
        </main>
      </div>
    </div>
  )
}
