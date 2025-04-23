import { useEffect, useState } from 'react'
import { useRoutineContext } from '../../store/RoutineContext'
import getTokenData from '../../logic/auth/getTokenData'
import Progress from '../../components/Progress/Progress'
import ExerciceCard from '../../components/cards/ExerciceCard/ExerciceCard'
import { Button } from '../../components/Button/Button'

export default function HomeAthlete() {
  const { fetchRoutine } = useRoutineContext()
  const [athleteId, setAthleteId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'plan' | 'progress'>('plan')

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getTokenData()
      if (tokenData?.role === 'athlete') {
        setAthleteId(tokenData.id)
        fetchRoutine(tokenData.id)
      }
    }

    fetchData()
  }, [fetchRoutine])

  return (
    <>
      <section className="flex justify-start items-center w-full gap-5">
        <h2 className="text-[30px] text-notblack-400 pb-2">
          Te damos la bienvenida
        </h2>
      </section>

      <div className="flex justify-start items-center gap-5 w-full mt-2">
        <button
          onClick={() => setActiveView('plan')}
          className={`font-[600] underline underline-offset-2 ${
            activeView === 'plan'
              ? 'text-primary-400'
              : 'text-secondary-400 hover:text-primary-400'
          }`}
        >
          Plan de hoy
        </button>
        <button
          onClick={() => setActiveView('progress')}
          className={`font-[600] underline underline-offset-2 ${
            activeView === 'progress'
              ? 'text-primary-400'
              : 'text-secondary-400 hover:text-primary-400'
          }`}
        >
          Progreso
        </button>
      </div>

      <div className="mt-4 w-full">
        {activeView === 'plan' && (
          <>
            <ExerciceCard />
            <Button
              text="Finalizar entrenamiento"
              variant="primary"
              onClick={() => console.log('Finalizar entrenamiento')}
              icon={<i className="bi bi-person-fill-add"></i>}
            />
          </>
        )}

        {activeView === 'progress' && athleteId && (
          <Progress athleteId={athleteId} />
        )}
      </div>
    </>
  )
}
