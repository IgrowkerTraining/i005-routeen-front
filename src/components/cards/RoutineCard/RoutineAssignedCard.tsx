import { useNavigate } from "react-router-dom";
import {  useState, useRef } from "react"
import { RoutineAssigned } from "../../../logic/interfaces/trainer";
import Dropdown from "../Modal"
interface RoutineAssignedCardProps {
    routine: RoutineAssigned;
    canEdit?: boolean;
}

export default function RoutineAssignedCard({
    routine,
    canEdit = false
}: RoutineAssignedCardProps) {
    const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null)
    const ignoreNextCardClick = useRef(false)

    const navigate = useNavigate();
    const { routine_id } = routine;


    const handleModalConfirm = (action: string) => {
        if (action === "edit") {
            // lógica de baja
        } else if (action === "renew") {
            // lógica de renovación
        }
    }

    const handleCardClick = (id: string) => {
        if (ignoreNextCardClick.current) {
            ignoreNextCardClick.current = false
            return
        }
        navigate(`/routine/${id}`)
    }

    return (
        <div
            onClick={() => handleCardClick(routine.id)}

            className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2 relative cursor-pointer min-h-[80px]"
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex-1 text-primary-400 font-bold leading-tight break-words">
                    <p className="text-lg">{routine_id.name}</p>
                    <p className="text-sm text-gray-600">{routine_id.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Asignada para: {routine.assignment_date}
                    </p>
                </div>

                {canEdit && (
                    <div
                        className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center text-primary-400 hover:bg-primary-400 hover:text-white transition-colors cursor-pointer ml-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("Edit button clicked for routine:", routine_id._id);
                            setSelectedRoutineId((prev) =>
                                prev === routine.id ? null : routine.id
                            )
                        }}
                    >
                        <i className="bi bi-pencil text-lg"></i>
                        <Dropdown
                            key={routine.id}
                            isOpen={selectedRoutineId === routine.id}
                            onClose={() => setSelectedRoutineId(null)}
                            options={[
                                {
                                    label: "Dar de baja",
                                    action: () => handleModalConfirm("cancel"),
                                },
                                {
                                    label: "Renovar membresía",
                                    action: () => handleModalConfirm("renew"),
                                },
                            ]}
                            blockNextClickRef={ignoreNextCardClick}
                        />
                    </div>


                )}
            </div>
        </div>
    );
}
