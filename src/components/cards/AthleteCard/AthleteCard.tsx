import { useMemo, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Dropdown from "../../cards/Modal"
import { Athlete } from "../../../types"

interface AthleteCardProps {
    athletes: Athlete[]
    onClearSearch?: () => void
}

export default function AthleteCard({ athletes, onClearSearch }: AthleteCardProps) {
    const navigate = useNavigate()
    const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null)
    const ignoreNextCardClick = useRef(false)

    const isEmpty = useMemo(() => athletes.length === 0, [athletes])

    const handleCardClick = (id: string) => {
        if (ignoreNextCardClick.current) {
            ignoreNextCardClick.current = false
            return
        }

        onClearSearch?.()
        navigate(`/athlete/${id}/athlete-overview`)
    }

    const handleModalConfirm = (action: string) => {
        if (action === "cancel") {
            // lógica de baja
        } else if (action === "renew") {
            // lógica de renovación
        }
    }
    console.log("Athletes:", athletes)

    return (

        <div className="flex flex-col w-full gap-4">
            {isEmpty ? (
                <p className="text-gray-400 font-bold">No se encuentra alumnos...</p>
            ) : (
                athletes.map((athlete) => (
                    <div
                        key={athlete.id}
                        className="relative flex items-center justify-between bg-notwhite-400 px-4 py-2 shadow-[0px_1px_4px_4px_rgba(0,0,0,0.2)] rounded-[12px] cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <div
                            className="flex-1 flex justify-start gap-4"
                            onClick={() => handleCardClick(athlete.id)}
                        >

                            {athlete.avatar ? (
                                <img
                                    src={athlete.avatar}
                                    alt={athlete.name}
                                    className="w-[55px] h-[55px] rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-[55px] h-[55px] rounded-full bg-gray-200 flex items-center justify-center">
                                    <i className="bi bi-person text-gray-400 text-2xl"></i>
                                </div>
                            )}
                            <div className="text-primary-400 flex flex-col justify-center font-bold leading-8 text-left">
                                {athlete.name.split(" ").map((part, i) => (
                                    <p key={i} className="text-lg">
                                        {part}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedAthleteId((prev) =>
                                        prev === athlete.id ? null : athlete.id
                                    )
                                }}
                                className="w-[40px] h-[40px] hover:bg-secondary-400 hover:opacity-50 rounded-full transition duration-300 ease-in-out transform"
                                aria-label="Opciones"
                            >
                                <i className="bi bi-gear text-primary-400 text-2xl"></i>
                            </button>

                            <Dropdown
                                key={athlete.id}
                                isOpen={selectedAthleteId === athlete.id}
                                onClose={() => setSelectedAthleteId(null)}
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
                    </div>
                ))
            )}
        </div>
    )
}
