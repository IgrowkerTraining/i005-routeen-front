import { Button } from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import RoutineAssignedCard from "../../../components/cards/RoutineCard/RoutineAssignedCard";
import getRoutinesByAthleteId from "../../../logic/trainer/getRoutinesByAthleteId";
import { useEffect, useState } from "react";
import { RoutineAssigned } from "../../../logic/interfaces/trainer";

export const AthleteRoutineTab = () => {
    const { id: athlete_id } = useParams<{ id: string }>();
    const [routines, setRoutines] = useState<RoutineAssigned[]>([]);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                if (!athlete_id) {
                    console.error("Athlete ID is undefined");
                    return;
                }
                const res = await getRoutinesByAthleteId(athlete_id);
                const formatted = res.routinesAssigned.map((routine) => ({
                    ...routine,
                }));
                setRoutines(formatted);
            } catch (err) {
                console.error("Error al obtener rutinas:", err);
            }
        };
        fetchRoutines();
    }, [athlete_id]);

    const today = new Date().toISOString().split("T")[0];

    const routinesToday = routines.filter((r) => r.assignment_date === today);
    const futureRoutines = routines.filter((r) => r.assignment_date > today);
    const pastRoutines = routines.filter((r) => r.assignment_date < today);

    return (
        <main className="flex flex-col pb-2 gap-6 sm:px-0">
            {/* Rutina de hoy */}
            <div className="text-primary-400 font-[600] underline">Rutina de hoy</div>
            {routinesToday.length > 0 ? (
                routinesToday.map((routine) => (
                    <RoutineAssignedCard routine={routine} canEdit />
        ))
            ) : (
                <p className="text-center text-gray-500 font-medium">
                    No hay rutina asignada para hoy
                </p>
            )}

            {/* Futuras rutinas */}
            <div className="text-primary-400 font-[600] underline">Futuras rutinas</div>
            {futureRoutines.length > 0 ? (
                futureRoutines.map((routine) => (
                    <RoutineAssignedCard routine={routine} canEdit />
        ))
            ) : (
                <p className="text-center text-gray-500 font-medium">
                    No hay rutinas programadas
                </p>
            )}

            {/* Rutinas pasadas */}
            <div className="text-primary-400 font-[600] underline">Rutinas pasadas</div>
            {pastRoutines.length > 0 ? (
                pastRoutines.map((routine) => (
                    <RoutineAssignedCard routine={routine} canEdit />
        ))
            ) : (
                <p className="text-center text-gray-500 font-medium">
                    No hay rutinas anteriores
                </p>
            )}

            <Button
                text="Agregar nueva rutina"
                variant="primary"
                href={`/athlete/${athlete_id}/routine/new`}
                icon={<i className="bi bi-plus text-2xl"></i>}
            />
        </main>
    );
};
