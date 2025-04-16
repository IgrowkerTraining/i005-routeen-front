import useAppContext from "../../../store/AppContext"
export default function ExerciceCard() {
    const { store: { routines } } = useAppContext()
    
    return (
        <div className="flex flex-col w-full gap-4">
            {routines.map(routine => (
                <div key={routine.name} className="flex flex-col gap-4">
                    <p className="text-xl font-bold text-primary-400">{routine.name}</p>
                    {routine.exercises.map((exercise) => (
                        <div
                            key={exercise.id}

                            className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2"
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
                </div>
            ))}
        </div>
    )
}
