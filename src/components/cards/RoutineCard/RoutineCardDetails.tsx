import { Button } from "../../Button/Button"
import { useParams } from "react-router-dom"
import useRoutinesContextD from "../../../store/RoutinesContextD"
export const RoutineCardDetails = () => {
    const { id } = useParams<{ id: string }>()
    const { store: { routines } } = useRoutinesContextD()

    const routineId = Number(id)
    const routine = routines.find((a) => Number(a.id) === routineId)
    return (
        <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <main className="flex flex-col gap-4">
                    <section className="flex flex-col justify-start items-center w-full gap-2 mb-4">
                        <h2 className="text-center font-semibold text-3xl text-notblack-400">
                            {routine ? `${routine.name}` : "Rutina no encontrado"}
                        </h2>
                        <p>
                            60 min - Avanzado
                        </p>
                    </section>
                    {routine?.exercises.map((exercise) => (
                        <div
                            key={exercise.id}


                            className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2 "
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="text-primary-400 font-bold leading-tight">
                                    <p className="text-lg">{exercise.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {exercise.sets} series x {exercise.reps} reps
                                    </p>
                                </div>
                                <img
                                    src={exercise.image}
                                    alt={exercise.name}
                                    className="w-[65px] h-[65px] rounded-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                    <Button
                        text="Agregar nueva rutina"
                        variant="primary"
                        href={`/athlete/${id}/routine/new`}
                        icon={<i className="bi bi-plus text-2xl"></i>}
                    />
                </main>
            </div>

        </div>
    )
}