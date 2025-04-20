import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AthleteRoutineTab } from "./tabs/AthleteRoutineTab"
import { Athlete } from "../../types"
import getTokenData from "../../logic/auth/getTokenData"
import getAthleteById from "../../logic/trainer/getAthleteById"

export const AthleteOverview = () => {
  const [activeTab, setActiveTab] = useState<"info" | "plan" | "progress">("plan")
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!id) return
  
    const fetchAthlete = async () => {
      try {
        setLoading(true)
        const tokenData = await getTokenData()
  
        if (tokenData?.role === "trainer") {
          const athleteData = await getAthleteById({ 
            trainer_id: tokenData.id, 
            athlete_id: id
          })
  
          const formattedAthlete = {
            ...athleteData,
            id: athleteData._id,
          }
  
          setAthlete(formattedAthlete)
        } else {
          console.error("El usuario no es entrenador o no tiene sesión activa")
        }
      } catch (error) {
        console.error("Error al obtener el atleta:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchAthlete()
  }, [id])
  


  const tabTitles: Record<"info" | "plan" | "progress", string> = {
    info: "Información",
    plan: "Rutina",
    progress: "Progreso",
  }

  if (loading) {
    return <div className="text-center p-4">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
      <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
        <div className="mb-4">
          <h3 className="text-center font-semibold text-lg text-notblack-400">
            {athlete ? `${tabTitles[activeTab]} de ${athlete.name}` : "Atleta no encontrado"}
          </h3>
        </div>

        <div className="flex border-b border-gray-300 mb-4">
          {["info", "plan", "progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "info" | "plan" | "progress")}
              className={`flex-1 text-center py-2 text-notblack-400  ${activeTab === tab
                ? "border-b-2 border-notblack-400 font-bold "
                : ""
                }`}
            >
              {tab === "info" && "Información"}
              {tab === "plan" && "Rutina"}
              {tab === "progress" && "Progreso"}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "info" && (
            <div className="text-notblack-400">Contenido de Información</div>
          )}
          {activeTab === "plan" && (
            <AthleteRoutineTab />
          )}
          {activeTab === "progress" && (
            <div className="text-notblack-400">Contenido de Progreso</div>
          )}
        </div>
      </div>
    </div>
  )
}
