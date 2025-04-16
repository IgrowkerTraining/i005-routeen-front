import { Button } from "../../../components/Button/Button";
import ExerciceCard from "../../../components/cards/ExerciceCard/ExerciceCard"
import { useParams } from "react-router-dom";

export const AthleteRoutineTab = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <main className="flex flex-col pb-2 gap-6 sm:px-0">

            <div className="flex justify-start items-center gap-5 w-full">
                <div
                    className="text-primary-400 font-[600] underline"
                >
                    Rutina de hoy
                </div>

            </div>
            <ExerciceCard />
            <Button
                text="Agregar nueva rutina"
                variant="primary"
                href={`/athlete/${id}/routine/new`}
                icon={<i className="bi bi-plus text-2xl"></i>}
            />
        </main>
    )
}