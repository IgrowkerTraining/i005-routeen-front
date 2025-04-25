import { useEffect, useState, ChangeEvent } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RoutineCard from "../../components/cards/RoutineCard/RoutineCard"
import getAllRoutinesByTrainerId from "../../logic/trainer/getAllRoutinesByTrainerId"
import getTokenData from "../../logic/auth/getTokenData"
import { Routine } from "../../logic/interfaces/trainer" // Define bien este tipo si no existe aún

import { useLocation } from "react-router-dom"
import { Button } from "../../components/Button/Button"

export const RoutineLibrary = () => {
    const { id: athlete_id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const location = useLocation()

    const [routines, setRoutines] = useState<Routine[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRoutine, setSelectedRoutine] = useState<string | null>(
        location.state?.selectedRoutineId || null
    )
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const token = await getTokenData()
                if (token?.role === "trainer") {
                    const res = await getAllRoutinesByTrainerId(token.id)
                    setRoutines(res)
                } else {
                    console.error("Usuario no autorizado para ver rutinas")
                }
            } catch (err) {
                console.error("Error al obtener rutinas:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchRoutines()
    }, [])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase())
    }

    const filteredRoutines = routines
        .filter((routine) =>
            routine.name?.toLowerCase().includes(searchTerm)
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Orden descendente



    if (loading) {
        return <div className="text-center p-4">Cargando...</div>
    }
    return (
        <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <main className="flex flex-col pb-2 gap-6 sm:px-0">
                    <div className="flex flex-col justify-center items-start gap-2 w-full">
                        <div className="relative w-full ">
                            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"></i>
                            <input
                                type="text"
                                placeholder="Buscar Rutina..."
                                className="bg-transparent border border-secondary-400 placeholder-zinc-400 text-notblack-400 font-bold rounded-md p-3 pl-10 w-full focus:outline-gray-500"
                                style={{ boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)" }}
                                onChange={handleSearch}
                            />
                        </div>
                        <span className="font-bold text-notblack-400 mt-3">Últimas rutinas creadas</span>
                    </div>

                    <div className="flex flex-col pb-2 gap-6 sm:px-0">

                        {filteredRoutines.slice(0, 5).map((routine) => (
                            <RoutineCard
                                key={routine._id}
                                routine={routine}
                                onSelectionChange={setSelectedRoutine}
                                selectedId={selectedRoutine}
                                athleteId={athlete_id}
                            />
                        ))}
                    </div>

                    <Button
                        text="Crear nueva rutina"
                        variant="primary"
                        onClick={() => navigate("/library/create")}
                    />

                </main>
            </div>
        </div>
    )
}
