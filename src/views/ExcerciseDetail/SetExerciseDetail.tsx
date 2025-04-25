import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./ExcerciseDetail.module.css";
import { Button } from "../../components/Button/Button";
import assignExerciseToRoutine from "../../logic/routines-exercices/assignExerciseToRoutine";

export const SetExerciseDetails = () => {
  const { id: exerciseId } = useParams();
  const [searchParams] = useSearchParams();
  const routineId = searchParams.get("routineId") ?? "";
  const exerciseName = searchParams.get("name") ?? "[Ejercicio]";
  const videoUrl = searchParams.get("video") ?? "";

  const navigate = useNavigate();

  const [series, setSeries] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const handleSave = async () => {
    try {
      await assignExerciseToRoutine({
        routine_id: routineId,
        exercise_id: exerciseId!,
        reps,
        series,
        weight_kg: weight
        // rest_time_s y desired_order no se pasan, se manejan en backend
      });
      navigate(`/library/create/${routineId}/add`);
    } catch (err) {
      console.error("Error al asignar ejercicio:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={`/library/create/${routineId}/add`}>
          <i className={`${styles.arrow} bi bi-arrow-left`}></i>
        </Link>
        <p className={`text-notblack-400 ${styles.name}`}>
          <strong>{exerciseName}</strong>
        </p>
      </div>

      <div className={styles.section_container}>
        {videoUrl && (
          <div className={styles.video_container}>
            <video
              src={videoUrl}
              className={styles.video}
              autoPlay
              muted
              loop
            />
          </div>
        )}

        <div className={styles.details}>
          <div className={styles.sets}>
            <p><strong>Series:</strong></p>
            <strong>
              <input
                id="series"
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
                <input
                  id="reps"
                  type="text"
                  className={styles.inputs}
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                />
              </strong>
            </p>
            <p>X</p>
            <p>
              <strong>
                <input
                  id="weight"
                  type="text"
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
            text="Guardar"
            variant="primary"
            onClick={handleSave}
            icon={<i className="bi bi-check-circle-fill" style={{ fontSize: '1.5rem' }}></i>}
          />
        </div>
      </div>
    </div>
  );
};
