// import { Button } from "../../Button/Button";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import getRoutineById from "../../../logic/routines-exercices/getRoutineById";
// import getExercisesByRoutineId from "../../../logic/routines-exercices/getExercisesByRoutineId";
// import { RoutineExercise } from "../../../logic/interfaces/exercice";
// import { Routine } from "../../../logic/interfaces/trainer";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../../store/AuthContext";
// import { useRoutineContext } from "../../../store/RoutineContext";
// import { Link } from "react-router-dom";
// import styles from "./RoutineCardDetails.module.css"

// export const RoutineAthleteDetails = () => {
//     const { id } = useParams<{ id: string }>();
//     const [routine, setRoutine] = useState<Routine | null>(null);
//     const [exercises, setExercises] = useState<RoutineExercise[]>([]);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const athlete_id = location.state?.athlete_id;
//     const { user } = useAuth();

//     const { setExercises: setExercisesFromContext, setRoutineId } = useRoutineContext();

//     const handleAddRoutine = () => {
//         if (!routine || !routine._id || !athlete_id) {
//             console.error("Faltan datos: rutina o atleta no definidos.");
//             return;
//         }
//         navigate(`/athlete/${athlete_id}/routine/new`, {
//             state: { selectedRoutineId: routine._id },
//         });
//     };

//     useEffect(() => {
//         if (exercises.length > 0) {
//             console.log("Exercises cargados:", exercises);
//         } else {
//             console.log("Aún no hay ejercicios cargados.");
//         }
//     }, [exercises]);

//     useEffect(() => {
//         if (id) {
//             setRoutineId(id);
//         }

//         const fetchRoutineDetails = async () => {
//             try {
//                 if (id) {
//                     const routineData = await getRoutineById(id);
//                     const exerciseData = await getExercisesByRoutineId(id);

//                     setRoutine(routineData);
//                     setExercises(exerciseData);
//                     setExercisesFromContext(exerciseData);
//                 }
//             } catch (error) {
//                 console.error("Error loading routine:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRoutineDetails();
//     }, [id, setExercisesFromContext, setRoutineId]);

//     if (loading) return <div className="text-center p-4">Cargando rutina...</div>;

//     if (!routine) return <div className="text-center p-4 text-red-500">Rutina no encontrada</div>;

//     return (
//         <div className="min-h-screen bg-notwhite-400  p-4 flex flex-col items-center">
//             {
//                 user?.role === "athlete" ?
//             <Link
//                 to={"/home"}
//                 className={styles.arrow}
//             >
//                 <i className="bi bi-arrow-left text-3xl text-primary-400 cursor-pointer hover:text-primary-500"></i>
//             </Link> :
//             null
//             }
//             <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
//                 <main className="flex flex-col gap-4">
//                     <section className="flex flex-col justify-start items-center w-full gap-2 mb-4">
//                         <h2 className="text-center font-semibold text-3xl text-notblack-400">
//                             {routine.name}
//                         </h2>
//                         <p>
//                             {routine.duration} min - {routine.difficulty}
//                         </p>
//                     </section>
//                     {exercises?.map((exercise) => (
//                         <div
//                             key={exercise._id}
//                             onClick={() => {
//                                 user?.role === "athlete" ? navigate(`/excercise-detail/${exercise._id}`) : "";
//                             }}
//                             className="flex items-center w-full bg-notwhite-400 px-4 shadow-md py-2 cursor-pointer"
//                         >
//                             <div className="flex items-center justify-between w-full">
//                                 <div className="text-primary-400 font-bold leading-tight">
//                                     <p className="text-lg">{exercise.exercise_id.name}</p>
//                                     <p className="text-sm text-gray-600">
//                                         {exercise.series} series x {exercise.reps} reps - {exercise.weight_kg}kg
//                                     </p>
//                                 </div>
//                                 <video
//                                     src={exercise.exercise_id.video_url}
//                                     className="w-[65px] h-[65px] rounded-full object-cover"
//                                     autoPlay
//                                     muted
//                                     loop
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     {
//                         user?.role === "trainer" ?
//                         <Button
//                             text="Agregar nueva rutina"
//                             variant="primary"
//                             onClick={handleAddRoutine}
//                             icon={<i className="bi bi-plus text-2xl"></i>}
//                         /> 
//                         :
//                         null
//                     }
//                 </main>
//             </div>
//         </div>
//     );
// };
