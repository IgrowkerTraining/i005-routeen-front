import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import createRoutine from "../../logic/routines-exercices/createRoutine";


export default function CreateRoutineForm() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Creando rutina...");
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("difficulty", difficulty);
            formData.append("duration", duration);


            console.log("Creando rutina...");
            const response = await createRoutine(formData);
            const routineId = response.newRoutine?._id;

            if (routineId) {
                navigate(`/library/create/${routineId}`, { replace: true });
            } else {
                throw new Error("No se recibió ID de rutina");
            }
        } catch (err) {
            console.error("Error al crear rutina:", err);
        }

    }

    return (
        <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 sm:px-0"
                >
                    <h3 className="text-xl font-bold text-notblack-400 text-center">Crear rutina</h3>
                    <Input
                        type="text"
                        placeholder="Nombre de rutina"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label
                        required
                    />

                    <Input
                        type="string"
                        placeholder="Descripción de rutina"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label
                        required
                    />
                    <CustomSelect
                        value={difficulty}
                        onChange={(value) => setDifficulty(value)}
                        placeholder="Selecciona dificultad"
                        options={[
                            { value: "principiante", label: "Principiante" },
                            { value: "intermedio", label: "Intermedio" },
                            { value: "avanzado", label: "Avanzado" },
                            { value: "experto", label: "Experto" },
                        ]}

                    />

                    <Input
                        type="number"
                        placeholder="Duración (minutos)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        label

                    />


                    <Button
                        submit
                        text="Crear rutina"
                        variant="primary"
                        icon={<i className="bi bi-bookmark text-xl"></i>}

                    />

                </form>
            </div>
        </div>
    );
};

