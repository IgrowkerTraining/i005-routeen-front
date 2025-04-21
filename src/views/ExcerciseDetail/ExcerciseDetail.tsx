import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { routines } from "../../mocks/exercices";
import styles from "./ExcerciseDetail.module.css";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
  weight: number;
  image: string;
}

export const ExcerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => {
    const routine = routines.find((routine) =>
      routine.exercises.some((exercise) => exercise.id === id)
    );
    if (routine) {
      const foundExercise = routine.exercises.find(
        (exercise) => exercise.id === id
      );
      if (foundExercise) {
        setExercise(foundExercise);
        setSets(foundExercise.sets);
        setReps(foundExercise.reps);
        setWeight(foundExercise.weight);
      }
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
        <p className={`text-notblack-400 ${styles.name}`}>
          <strong>{exercise.name}</strong>
        </p>
      </div>
      <div className={styles.section_container}>
        <div className={styles.video_container}>
          <img
            className={styles.video}
            src={`../../../public/${exercise.image}`}
            alt={exercise.name}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.sets}>
            <p><strong>Series:</strong></p>
            <strong>
              <Input
                type="text"
                className={styles.inputs}
                value={sets}
                onChange={(e) => setSets(Number(e.target.value))}
              />
            </strong>
          </div>
          <p><strong>Repeticiones:</strong> </p>
          <div className={styles.reps}>
            <p>
              <strong>
                <Input
                  className={styles.inputs}
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                />
              </strong>
            </p>
            <p>X</p>
            <p>
              <strong>
                <Input
                  className={styles.inputs}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </strong>
            </p>
            <p><strong>Kg</strong></p>
          </div>
          <Button
            className={styles.button}
            text="  Listo"
            variant="primary"
            onClick={() =>
              console.log("Agregar Alumno con:", { sets, reps, weight })
            }
            icon={<i className="bi bi-check-circle-fill" style={{ fontSize: '1.5rem' }}></i>}
          />
        </div>
      </div>
    </div>
  );
};
