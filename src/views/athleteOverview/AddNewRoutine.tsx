import useAppContext from "../../store/AppContext";
import { ChangeEvent, useState } from "react";
import InputCalendar from "../../components/Calendar/InputCalendar";
import { useParams, useNavigate } from "react-router-dom";
import RoutineCard from "../../components/cards/RoutineCard/RoutineCard";
export const AddNewRoutine = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()

    const { actions: { searchRoutines } } = useAppContext()
    const [selectedRoutine, setSelectedRoutine] = useState<number | null>(null)


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        searchRoutines(e.target.value)
    }

    // Función para manejar la confirmación
    const handleConfirm = () => {
        // Limpiar la búsqueda pasando una cadena vacía
        searchRoutines("")
        // Navegar de vuelta
        navigate(`/athlete/${id}/athlete-overview`)
    }

    return (
        <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <main className="flex flex-col pb-2 gap-6 sm:px-0">

                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                        <div className="relative w-full">
                            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"></i>
                            <input
                                type="text"
                                placeholder="Buscar Rutina..."
                                className="bg-transparent border border-secondary-400 placeholder-zinc-400 text-notblack-400 font-bold rounded-md p-3 pl-10 w-full focus:outline-gray-500"
                                style={{
                                    boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)"

                                }}
                                onChange={handleSearch}
                            />
                        </div>
                        <span className="font-bold text-notblack-400">Ultimas rutinas asignadas</span>
                    </div>
                    <RoutineCard canSelect={true} onSelectionChange={setSelectedRoutine} />
                    <InputCalendar
                        id="date"
                        label="Seleccionar dia"
                        isRequired
                    />
                    <button
                        className={`mt-4 px-4 py-2 rounded ${selectedRoutine ? 'bg-primary-400 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!selectedRoutine}
                        onClick={handleConfirm}
                    >
                        Confirmar rutina
                    </button>
                </main>
            </div>
        </div>
    )
}