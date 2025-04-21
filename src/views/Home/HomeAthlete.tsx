import { Button } from "../../components/Button/Button";
import ExerciceCard from "../../components/cards/ExerciceCard/ExerciceCard";
import { Link, useParams } from "react-router-dom"; // Usamos useParams para obtener el ID de la URL
import { useEffect } from "react";
import { useRoutineContext } from "../../store/RoutineContext";

export default function HomeAthlete() {
    // Obtenemos el athleteId desde la URL
    const { athleteId } = useParams<{ athleteId: string }>();

    // Usamos el contexto para obtener la rutina y la función para cargarla
    const { fetchRoutine } = useRoutineContext();

    // Ejecutamos el fetch cuando el componente se monta o cuando cambia el athleteId
    useEffect(() => {
        if (athleteId) {
            fetchRoutine(athleteId);
        }
    }, [athleteId, fetchRoutine]);

    return (
        <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <main className="flex flex-col px-4 pb-2 gap-6 sm:px-0">
                    <section className="flex justify-start items-center w-full gap-5">
                        <h2 className="text-[30px] text-notblack-400">
                            Te damos la bienvenida
                        </h2>
                    </section>

                    <div className="flex justify-start items-center gap-5 w-full">
                        <Link to="/routine"
                            className="text-primary-400 font-[600] underline underline-offset-2"
                        >
                            Plan de hoy
                        </Link>
                        <Link to="/progress"
                            className="text-primary-400 font-[600] underline underline-offset-2"
                        >
                            Progreso
                        </Link>
                    </div>
                    <ExerciceCard />
                    <Button
                        text="Agregar"
                        variant="primary"
                        onClick={() => console.log("Agregar Alumno")}
                        icon={<i className="bi bi-person-fill-add"></i>}
                    />
                </main>
            </div>
        </div>
    )
}
