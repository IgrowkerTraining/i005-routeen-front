import { useState } from "react";
import Dropdown from "../Modal";

interface Props {
    routineId: string;
    selectedRoutineId: string | null;
    setSelectedRoutineId: (id: string | null) => void;
    onAction: (action: string) => void;
    blockNextClickRef: React.RefObject<boolean>;
    routineName: string;
}

export default function EditAssignedRoutineDropdown({
    routineId,
    selectedRoutineId,
    setSelectedRoutineId,
    onAction,
    blockNextClickRef,
    routineName,
}: Props) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <div
                className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center text-primary-400 hover:bg-primary-400 hover:text-white transition-colors cursor-pointer ml-4"
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRoutineId(selectedRoutineId === routineId ? null : routineId);
                }}
            >
                <i className="bi bi-pencil text-lg"></i>
            </div>

            <Dropdown
                key={routineId}
                isOpen={selectedRoutineId === routineId && !showConfirm}
                onClose={() => setSelectedRoutineId(null)}
                options={[
                    {
                        label: "Eliminar rutina",
                        action: () => setShowConfirm(true),
                    },
                    {
                        label: "Reemplazar rutina",
                        action: () => onAction("replace"),
                    },
                    {
                        label: "Cambiar fecha",
                        action: () => onAction("change-date"),
                    },
                ]}
                blockNextClickRef={blockNextClickRef}
            />

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={(e) => e.stopPropagation()}
                    ></div>
                    {/* Card de confirmación */}
                    <div
                        className="relative z-60 bg-white rounded-xl shadow-xl w-[300px] max-w-[90%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-primary-400 text-white px-4 py-2 rounded-t-xl">
                            <h3 className="font-semibold text-sm text-center">¿Eliminar Rutina?</h3>
                        </div>
                        <div className="p-4 text-sm text-gray-700 text-center">
                            ¿Seguro que quieres eliminar la rutina <span className="font-semibold text-primary-400">"{routineName}"</span>?
                        </div>
                        <div className="flex justify-between items-center px-4 pb-4 gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-2 rounded-lg shadow bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-semibold transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    onAction("delete");
                                }}
                                className="flex-1 py-2 rounded-lg shadow bg-lime-300 text-black font-bold hover:bg-lime-400 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
