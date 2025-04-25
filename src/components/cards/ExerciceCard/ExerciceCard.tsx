import { routines } from '../../../mocks/exercices';
import { Link } from 'react-router-dom';

export default function ExerciceCard() {
    return (
        <div className="flex flex-col w-full gap-4">
            {routines.map(routine => (
                <div key={routine.name} className="flex flex-col gap-4">
                    <p className="text-xl font-bold text-primary-400">{routine.name}</p>
                    {routine.exercises.map((exercise) => (
                        <Link to={`/excercise-detail/${exercise.id}`}>
                        <div
                            key={exercise.id}
                            style={{
                                boxShadow: '0px 1px 4px 4px rgba(0, 0, 0, 0.2)',
                                borderRadius: '12px',
                            }}
                            className="flex items-center w-full bg-notwhite-400 px-4 py-2"
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
                            </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}