import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getRoutineById from "../../logic/routines-exercices/getRoutineById";
import { Button } from "../../components/Button/Button";

import { Routine } from "../../types";


export const RoutineOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [routine, setRoutine] = useState<Routine | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                if (id) {
                    const data = await getRoutineById(id);
                    setRoutine(data);
                }
            } catch (error) {
                console.error("Error al cargar rutina:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutine();
    }, [id]);

    if (loading) return <p className="text-center mt-8">Cargando rutina...</p>;
    if (!routine) return <p className="text-center mt-8">No se encontró la rutina.</p>;

    return (
        <div className="min-h-[85vh] bg-notwhite-400 flex flex-col justify-between p-4">
            <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left text-2xl text-notblack-400" />
                </button>
                <h2 className="text-lg font-bold text-notblack-400">{routine.name}</h2>
            </div>

            {/* Centro */}
            <div className="flex flex-col items-center justify-center">
                <p className="text-notblack-400 font-medium text-center">
                    Aún no hay ejercicios en la rutina
                </p>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-4">
                <Button
                    text="Agregar ejercicio"
                    icon={<i className="bi bi-bookmark text-lg" />}
                    variant="primary"
                    onClick={() => navigate(`/library/create/${id}/add`)}
                />
                <Button
                    text="Eliminar rutina"
                    variant="primary"
                    className="bg-accent-400! text-notblack-400!"
                />
            </div>
        </div>
    );
};
