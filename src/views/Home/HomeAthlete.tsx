import { useEffect, useState } from 'react'
import { useRoutineContext } from '../../store/RoutineContext'
import getTokenData from '../../logic/auth/getTokenData'
import RoutineAssignedCard from '../../components/cards/RoutineCard/RoutineAssignedCard'
import { RoutineAssigned } from '../../logic/interfaces/trainer'
import Progress from '../../components/Progress/Progress'
import getRoutinesByAthleteId from '../../logic/trainer/getRoutinesByAthleteId'
import useAppContext from '../../store/AppContext'

export default function HomeAthlete() {
  const { fetchRoutine } = useRoutineContext()
  const { actions, store } = useAppContext()
  const [athleteId, setAthleteId] = useState<string>("")
  const [activeTab, setActiveTab] = useState<'plan' | 'progress'>('plan')
  const [routines, setRoutines] = useState<RoutineAssigned[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getTokenData()
      if (tokenData?.role === 'athlete') {
        setAthleteId(tokenData.id)
        localStorage.setItem("user_id", tokenData.id)
        fetchRoutine(tokenData.id)
      }
    }
    fetchData()
  }, [fetchRoutine, actions])

  useEffect(() => {
    const fetchRoutines = async () => {
      if (!athleteId) return
      try {
        const res = await getRoutinesByAthleteId(athleteId)
        setRoutines(res.routinesAssigned)
      } catch (err) {
        console.error("Error al obtener rutinas:", err)
      }
    }
    fetchRoutines()
  }, [athleteId])

  const today = new Date().toDateString()

  const routinesToday = routines.filter((r) =>
    new Date(r.assignment_date).toDateString() === today
  )

  return (
    <main className="px-4 py-6 w-full ">
      <h2 className="text-[30px] text-notblack-400 mb-4">Te damos la bienvenida</h2>

      <div className="flex justify-between items-center gap-5 border-b border-gray-300 mb-6">
        <button
          className={`font-semibold pb-2 ${activeTab === 'plan' ? 'border-b-4 border-primary-400 text-primary-400' : 'text-secondary-400 hover:text-primary-400'}`}
          onClick={() => setActiveTab('plan')}
        >
          Plan de hoy
        </button>
        <button
          className={`font-semibold pb-2 ${activeTab === 'progress' ? 'border-b-4 border-primary-400 text-primary-400' : 'text-secondary-400 hover:text-primary-400'}`}
          onClick={() => setActiveTab('progress')}
        >
          Progreso
        </button>
      </div>

      {activeTab === 'plan' && (
        <section className="flex flex-col gap-4">
          {routinesToday.length > 0 ? (
            routinesToday.map((routine) => (
              <RoutineAssignedCard key={routine.id} routine={routine} />
            ))
          ) : (
            <p className="text-center text-gray-500 font-medium">
              No tienes rutinas asignadas para hoy
            </p>
          )}
        </section>
      )}

      {activeTab === 'progress' && (
        <section>
          <Progress athleteId={athleteId} />
        </section>
      )}

      <div className="mt-6 flex justify-center">
        <button className="bg-primary-400 text-white rounded-full py-2 px-4 shadow-md hover:bg-primary-500 transition-all">
          <i className="bi bi-check2-circle mr-2 text-lg"></i>
          Finalizar entrenamiento
        </button>
      </div>
    </main>
  )
}
