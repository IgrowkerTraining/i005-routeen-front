import { useState } from "react"
import useRoutinesContextD from "../../../store/RoutinesContextD"
import { useNavigate } from "react-router-dom"

interface RoutineCardProps {
    canEdit?: boolean;
    canSelect?: boolean;
    onSelectionChange?: (selectedId: number | null) => void;
}

export default function RoutineCard({ canEdit = false, canSelect = false, onSelectionChange }: RoutineCardProps) {
    const {
        store: { routines },
        actions: { searchRoutines }
    } = useRoutinesContextD()
    const navigate = useNavigate()

    const [selectedId, setSelectedId] = useState<number | null>(null)

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        e.stopPropagation()
        const newSelectedId = e.target.checked ? id : null
        setSelectedId(newSelectedId)
        if (onSelectionChange) onSelectionChange(newSelectedId)
    }

    const onRoutineClick = (id: number) => {
        searchRoutines("")
        navigate(`/routine/${id}`)
    }

    return (
        <div className="flex flex-col w-full gap-4">
            {routines.map(routine => (
                <div className="flex flex-col gap-4">
                    <div
                        key={routine.id}
                        onClick={() => onRoutineClick(Number(routine.id))}
                        className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2 relative cursor-pointer"
                    >
                        <div className="flex items-center justify-between w-full">
                            <div className="text-primary-400 font-bold leading-tight">
                                <p className="text-lg">{routine.name}</p>
                                <p className="text-sm text-gray-600">
                                    {routine.duration || 60} min - {routine.level || 'Intermedio'}
                                </p>
                            </div>

                            {canEdit && (
                                <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center text-primary-400 hover:bg-primary-400 hover:text-white transition-colors cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        console.log('Edit button clicked for routine:', routine.id)
                                    }}
                                >
                                    <i className="bi bi-pencil text-lg"></i>
                                </div>
                            )}

                            {canSelect && (
                                <input
                                    type="checkbox"
                                    checked={selectedId === Number(routine.id)}
                                    onChange={(e) => handleCheckboxChange(e, Number(routine.id))}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-5 h-5 accent-primary-400"
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
