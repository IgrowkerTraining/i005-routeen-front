import { useMemo, useState, useRef } from "react"
import useAppContext from "../../../store/AppContext"
import { useNavigate } from "react-router-dom"
import Dropdown from "../../cards/Modal"

export default function AthleteCard() {
    const { store: { athletes } } = useAppContext()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(null)

    const isEmpty = useMemo(() => athletes.length <= 0, [athletes])
    const ignoreNextCardClick = useRef(false)

    const handleCardClick = (id: number) => {
        if (ignoreNextCardClick.current) {
            ignoreNextCardClick.current = false
            return 
        }
        navigate(`/athlete/${id}/athlete-overview`)
    }

    const handleModalConfirm = (action: string) => {
        if (action === "cancel") {
        } else if (action === "renew") {
        }
    }

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
                            onClick={() => handleCardClick(Number(athlete.id))}
                        >
                            <img
                                src={athlete.avatar}
                                alt={athlete.name}
                                className="w-[55px] h-[55px] rounded-full object-cover"
                            />
                            <div className="text-primary-400 font-bold leading-8 text-left">
                                <p className="text-lg">{athlete.name.split(" ")[0]}</p>
                                <p className="text-lg">{athlete.name.split(" ")[1]}</p>
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsModalOpen((prev) => !prev)
                                    setSelectedAthleteId(Number(athlete.id))
                                }}
                                className="w-[40px] h-[40px] hover:bg-secondary-400 hover:opacity-50 rounded-full transition duration-300 ease-in-out transform"
                                aria-label="Opciones"
                            >
                                <i className="bi bi-gear text-primary-400 text-2xl"></i>
                            </button>

                            <Dropdown
                                isOpen={isModalOpen && selectedAthleteId === Number(athlete.id)}
                                onClose={() => setIsModalOpen(false)}
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
