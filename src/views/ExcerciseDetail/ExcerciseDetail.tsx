import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRoutineContext } from "../../store/RoutineContext";
import styles from "./ExcerciseDetail.module.css";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import axios from "../../api/axiosInstance";
import useAppContext from "../../store/AppContext";

export const ExcerciseDetail = () => {
  const { id } = useParams();
  const { exercises, routineId } = useRoutineContext();
  const { store } = useAppContext();
  const athleteId = store.athleteId;

  const [series, setSeries] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const [exercise, setExercise] = useState<any>(null);


  useEffect(() => {
    const found = exercises.find((ex) => ex.exercise_id._id === id);
    if (found) {
      setExercise(found);
      setSeries(found.series);
      setReps(found.reps);
      setWeight(found.weight_kg);
    }
  }, [id, exercises]);



  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `athlete/${athleteId}/assigned-exercise/${exercise._id}`,
        {
          series,
          reps,
          weight_kg: weight,

        },
        {
          withCredentials: true,
        }
      );
  
      console.log("Ejercicio actualizado:", res.data);
    } catch (error) {
      console.error("Error al actualizar el ejercicio:", error);
    }
  };
  

  if (!exercise) {
    return <p>Cargando ejercicio...</p>;
  }

  const { name, video_url } = exercise.exercise_id;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={`/routine/${routineId}`}>
          <i className={`${styles.arrow} bi bi-arrow-left`}></i>
        </Link>
        <p className={`text-notblack-400 ${styles.name}`}>
          <strong>{name}</strong>
        </p>
      </div>
      <div className={styles.section_container}>
        <div className={styles.video_container}>
          <video
            src={video_url}
            className={styles.video}
            autoPlay
            muted
            loop
          />
        </div>
        <div className={styles.details}>
          <div className={styles.sets}>
            <p><strong>Series:</strong></p>
            <strong>
              <Input
                type="text"
                className={styles.inputs}
                value={series}
                onChange={(e) => setSeries(Number(e.target.value))}
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
            onClick={handleUpdate}
            icon={<i className="bi bi-check-circle-fill" style={{ fontSize: '1.5rem' }}></i>}
          />
        </div>
      </div>
    </div>
  );
};
