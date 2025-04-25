import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { RoutineAssigned } from "../../../logic/interfaces/trainer";
import { useAuth } from "../../../store/AuthContext";
import deleteAssignedRoutine from "../../../logic/routines-exercices/deleteAssignedRoutine";
import EditAssignedRoutineDropdown from "./EditAssignedRoutineDropdown";


interface RoutineAssignedCardProps {
    routine: RoutineAssigned;
    canEdit?: boolean;
    onDeleted?: () => void;
}

export default function RoutineAssignedCard({
    routine,
    canEdit = false,
    onDeleted,
}: RoutineAssignedCardProps) {
    const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
    const ignoreNextCardClick = useRef(false);

    const { user } = useAuth();
    const navigate = useNavigate();
    const { routine_id, _id } = routine;

    const handleModalConfirm = async (action: string) => {
        if (action === "delete") {
            try {
                console.log("Eliminando rutina asignada...");
                await deleteAssignedRoutine(_id);
                console.log("Rutina asignada eliminada");
                setSelectedRoutineId(null);
                if (onDeleted) onDeleted();
            } catch (err) {
                console.error("Error eliminando rutina:", err);
            }
        } else if (action === "replace") {
        } else if (action === "change-date") {
        }
    };

    const handleCardClick = (routineId: string) => {
        if (ignoreNextCardClick.current) {
            ignoreNextCardClick.current = false;
            return;
        }
      
 const targetId =
      user?.role === "trainer" ? routine_id._id : _id;
    navigate(`/routine/${targetId}`);
  }

    return (
        <div
        onClick={() =>
            user?.role === "trainer"
                ? handleCardClick(routine_id._id)  
                : handleCardClick(routine._id)     
        }
            className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2 relative cursor-pointer min-h-[80px]"
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex-1 text-primary-400 leading-tight break-words">
                    <p className="text-lg font-bold">{routine_id.name}</p>
                    <p className="text-sm font-bold text-gray-600">{routine_id.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Asignada para: {new Date(routine.assignment_date).toLocaleDateString("es-ES")}
                    </p>
                </div>

                {canEdit && (
                    <EditAssignedRoutineDropdown
                        routineId={_id}
                        selectedRoutineId={selectedRoutineId}
                        setSelectedRoutineId={setSelectedRoutineId}
                        onAction={handleModalConfirm}
                        blockNextClickRef={ignoreNextCardClick}
                        routineName={routine_id.name}
                    />
                )}
            </div>
        </div>
    );
}
