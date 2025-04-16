import { Button } from "../../components/Button/Button";
import ExerciceCard from "../../components/cards/ExerciceCard/ExerciceCard";
import { Link, useParams } from "react-router-dom"; // Usamos useParams para obtener el ID de la URL
import { useEffect } from "react";
import { useRoutineContext } from "../../store/RoutineContext";

export default function HomeAthlete() {
    // Obtenemos el athleteId desde la URL
    const { athleteId } = useParams<{ athleteId: string }>();

    // Usamos el contexto para obtener la rutina y la función para cargarla
    const { routine, fetchRoutine } = useRoutineContext();

    // Ejecutamos el fetch cuando el componente se monta o cuando cambia el athleteId
    useEffect(() => {
        if (athleteId) {
            fetchRoutine(athleteId);
        }
    }, [athleteId, fetchRoutine]);

    return (
        <main className="flex flex-col justify-between h-screen px-4 pb-2 gap-6">
            <section className="flex flex-col justify-start w-full gap-5">
                <h2 className="text-[30px] text-notblack-400">
                    Te damos la bienvenida
                </h2>

                <div className="flex justify-start items-center gap-5 w-full ">
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
            </section>

            <Button
                text="Agregar"
                variant="primary"
                onClick={() => console.log("Agregar Alumno")}
                icon={<i className="bi bi-person-fill-add "></i>}
            />
        </main>
    );
}
