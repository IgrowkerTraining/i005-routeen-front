import { useState } from "react"
import { useParams } from "react-router-dom"
import useAppContext from "../../store/AppContext"
import { AthleteRoutineTab } from "./tabs/AthleteRoutineTab"
import { AthleteInfoTab } from "./tabs/AthleteInfoTab"

export const AthleteOverview = () => {
  const [activeTab, setActiveTab] = useState<"info" | "plan" | "progress">("plan")
  const { id } = useParams<{ id: string }>()
  const { store: { athletes } } = useAppContext()

  const athleteId = Number(id)
  const athlete = athletes.find((a) => Number(a._id) === athleteId)

  const tabTitles: Record<"info" | "plan" | "progress", string> = {
    info: "Información",
    plan: "Rutina",
    progress: "Progreso",
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
            <AthleteInfoTab />
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
