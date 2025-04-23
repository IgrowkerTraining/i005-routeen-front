import { useEffect, useState, ChangeEvent } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RoutineCard from "../../components/cards/RoutineCard/RoutineCard"
import InputCalendar from "../../components/Calendar/InputCalendar"
import getAllRoutinesByTrainerId from "../../logic/trainer/getAllRoutinesByTrainerId"
import assignRoutineToAthlete from "../../logic/trainer/assignRoutineToAthlete"
import getTokenData from "../../logic/auth/getTokenData"
import { Routine } from "../../logic/interfaces/trainer" // Define bien este tipo si no existe aún
import Input from "../../components/Input/Input"
import { useLocation } from "react-router-dom"

export const AddNewRoutine = () => {
    const { id: athlete_id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const location = useLocation()

    const [routines, setRoutines] = useState<Routine[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [assignmentDate, setAssignmentDate] = useState<string>("")
    const [description, setDescription] = useState<string>("")
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

    const filteredRoutines = routines.filter((routine) =>
        routine.name?.toLowerCase().includes(searchTerm)
    )

    const handleConfirm = async () => {
        if (!athlete_id || !selectedRoutine || !assignmentDate) {
            console.error("Faltan datos para asignar la rutina")
            return
        }
        let formattedDate = assignmentDate
        if (assignmentDate && assignmentDate.includes("/")) {
            const [day, month, year] = assignmentDate.split("/")
            formattedDate = `${year}-${month}-${day}`
        }
        const formData = new FormData()
        formData.append("athlete_id", athlete_id)
        formData.append("routine_id", selectedRoutine)
        formData.append("description", description)
        formData.append("assignment_date", formattedDate)

        try {
            await assignRoutineToAthlete(formData)
            console.log("athlete_id:", athlete_id)
            console.log("selectedRoutine:", selectedRoutine)
            console.log("assignmentDate:", assignmentDate)
            console.log("description:", description)
            navigate(`/athlete/${athlete_id}/athlete-overview`)
            setSelectedRoutine(null)
            setAssignmentDate("")

        } catch (err) {
            console.error("Error al asignar rutina:", err)
        }

    }
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
                        <span className="font-bold text-notblack-400 mt-3">Últimas rutinas asignadas</span>
                    </div>

                    <div className="flex flex-col pb-2 gap-6 sm:px-0">

                        {filteredRoutines.map((routine) => (
                            <RoutineCard
                                key={routine._id}
                                routine={routine}
                                canSelect={true}
                                onSelectionChange={setSelectedRoutine}
                                selectedId={selectedRoutine}
                                athleteId={athlete_id}
                            />
                        ))}
                    </div>
                    <Input
                        id="description"
                        label
                        type="text"
                        placeholder="Comentarios adicionales"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <InputCalendar
                        id="date"
                        label="Seleccionar día"
                        isRequired
                        onChange={(e) => {
                            const selectedDate = e.target.value
                            setAssignmentDate(selectedDate)

                        }}
                        allowPastDates={false}
                    />

                    <button
                        className={`mt-4 px-4 py-2 rounded ${selectedRoutine && assignmentDate
                            ? "bg-primary-400 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        disabled={!selectedRoutine || !assignmentDate}
                        onClick={handleConfirm}
                    >
                        Confirmar rutina
                    </button>
                </main>
            </div>
        </div>
    )
}
