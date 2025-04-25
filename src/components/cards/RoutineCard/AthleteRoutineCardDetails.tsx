import { Button } from "../../Button/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import getRoutineAssigned from "../../../logic/routines-exercices/getRoutineAssigned";
import getExercisesAssigned from "../../../logic/routines-exercices/getExcercisesAssigned";
import { RoutineExercise } from "../../../logic/interfaces/exercice";
import { Routine } from "../../../logic/interfaces/trainer";
import { useRoutineContext } from "../../../store/RoutineContext";
import styles from "./RoutineCardDetails.module.css";
import SendExerciseDone from "../../../logic/routines-exercices/sendExcerciseDone"; 

export const AthleteRoutineCardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [exercises, setExercises] = useState<RoutineExercise[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const { setExercises: setExercisesFromContext, setRoutineId } = useRoutineContext();

  useEffect(() => {
    if (!id || !userId) {
      console.error("Falta el ID de la rutina o el usuario.");
      setLoading(false);
      return;
    }

    setRoutineId(id);

    const fetchRoutineDetails = async () => {
      try {
        const routineData = await getRoutineAssigned(userId, id);
        const exerciseData = await getExercisesAssigned(userId, id);
        setRoutine(routineData.routine);
        setExercises(exerciseData.assignedExercises);
        setExercisesFromContext(exerciseData.assignedExercises);
      } catch (error) {
        console.error("Error loading routine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutineDetails();
  }, [id, userId, setExercisesFromContext, setRoutineId]);

  const handleDoneRoutine = async () => {
    navigate("/congratulations");
    // if (!routine || !id) {
    //   console.error("Faltan datos necesarios para registrar la rutina.");
    //   return;
    // }

    // try {
    //   const response = await SendExerciseDone(id, routine);  
    //   if (response) {
    //     navigate("/congratulations");
    //   }
    // } catch (error) {
    //   console.error("Error al finalizar rutina:", error);
    // }
  };

  if (loading) return <div className="text-center p-4">Cargando rutina...</div>;
  if (!routine) return <div className="text-center p-4 text-red-500">Rutina no encontrada</div>;

  return (
    <div className="min-h-screen bg-notwhite-400 p-4 flex flex-col items-center">
      <Link to="/home" className={styles.arrow}>
        <i className="bi bi-arrow-left text-3xl text-primary-400 cursor-pointer hover:text-primary-500"></i>
      </Link>
      <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
        <main className="flex flex-col gap-4">
          <section className="flex flex-col justify-start items-center w-full gap-2 mb-4">
            <h2 className="text-center font-semibold text-3xl text-notblack-400">{routine.routine_id?.name}</h2>
            <p>{routine.routine_id?.duration} min - {routine.routine_id?.difficulty}</p>
          </section>
          {exercises.map((exercise) => (
            <div key={exercise._id} onClick={() => navigate(`/excercise-detail/${exercise.exercise_id._id}`)} className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2 cursor-pointer">
              <div className="flex items-center justify-between w-full">
                <div className="text-primary-400 font-bold leading-tight">
                  <p className="text-lg">{exercise.exercise_id.name}</p>
                  <p className="text-sm text-gray-600">{exercise.series} series x {exercise.reps} reps - {exercise.weight_kg}kg</p>
                </div>
                <video src={exercise.exercise_id.video_url} className="w-[65px] h-[65px] rounded-full object-cover" autoPlay muted loop />
              </div>
            </div>
          ))}
          <Button text="Finalizar entrenamiento" variant="primary" onClick={handleDoneRoutine} icon={<i className="bi bi-check-circle-fill text-2xl"></i>} />
        </main>
      </div>
    </div>
  );
};
