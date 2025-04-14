interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    rest: number;
    weight: number;
    image: string;
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { routines } from "../../mocks/exercices";
import styles from "./ExcerciseDetail.module.css";
import { Link } from "react-router-dom";

export const ExcerciseDetail = () => {
    const { id } = useParams();  
    const [exercise, setExercise] = useState<Exercise | null>(null);  

    useEffect(() => {
        const routine = routines.find((routine) =>
            routine.exercises.some((exercise) => exercise.id === id)
        );
        if (routine) {
            const foundExercise = routine.exercises.find((exercise) => exercise.id === id);
            setExercise(foundExercise || null);
        }
    }, [id]);

    if (!exercise) {
        return <p>Cargando ejercicio...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}> 
                <Link to="/home">
                <i className={`${styles.arrow} bi bi-arrow-left`}></i>
                </Link>
                <p className="text-notblack-400">
                    <strong>{exercise.name}</strong>
                </p>
            </div>
            <div className={styles.video_container}>
                <img className={styles.video} src={`../../../public/${exercise.image}`} alt={exercise.name} />
            </div>
            <div className={styles.details}>
                <p><strong>Sets:</strong> {exercise.sets}</p>
                <p><strong>Reps:</strong> {exercise.reps}</p>
                <p><strong>Rest:</strong> {exercise.rest} seconds</p>
                <p><strong>Weight:</strong> {exercise.weight} kg</p>
            </div>
           
                <input className={styles.input} type="text" placeholder="Descripción" />
          
        </div>
    );
};
