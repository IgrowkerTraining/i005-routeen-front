import { Button } from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import RoutineCard from "../../../components/cards/RoutineCard/RoutineCard";

export const AthleteRoutineTab = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <main className="flex flex-col pb-2 gap-6 sm:px-0">

            <div
                className="text-primary-400 font-[600] underline"
            >
                Rutina de hoy
            </div>

            <RoutineCard canEdit={true} />
            <div
                className="text-primary-400 font-[600] underline"
            >
                Futuras Rutinas
            </div>
            <Button
                text="Agregar nueva rutina"
                variant="primary"
                href={`/athlete/${id}/routine/new`}
                icon={<i className="bi bi-plus text-2xl"></i>}
            />
        </main>
    )
}