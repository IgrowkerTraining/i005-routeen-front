import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getRoutineById from "../../logic/routines-exercices/getRoutineById";
import getAllCategories from "../../logic/exercises/getAllCategories";
import getExercisesByCategory from "../../logic/exercises/getExercisesByCategory";
import { Button } from "../../components/Button/Button";
import { Routine } from "../../types";
import { Exercise } from "../../types";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

interface Category {
  _id: string;
  name: string;
}

export const AddExerciseToRoutine = () => {
  const { id: routineId } = useParams();
  const navigate = useNavigate();
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  const [routine, setRoutine] = useState<Routine | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");

  const handleAddExercise = () => {
    if (!selectedExerciseId) {
      console.error("No se ha seleccionado ningún ejercicio.");
      return;
    }
    navigate(`/library/create/${routineId}/add/${selectedExerciseId}`);
  };

  useEffect(() => {
    getRoutineById(routineId!).then(setRoutine);
    getAllCategories().then(setCategories);
  }, [routineId]);

  useEffect(() => {
    if (selectedCategory) {
      console.log("🟡Cargando ejercicios para categoría:", selectedCategory);
      getExercisesByCategory(selectedCategory).then((data) => {
        console.log(" Ejercicios cargados:", data);
        setExercises(data);
        setFilteredExercises(data);
      });
    }
  }, [selectedCategory]);


  useEffect(() => {
    const filtered = exercises.filter((ex) =>
      ex.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [search, exercises]);

  return (
    <div className="min-h-screen bg-notwhite-400 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left text-2xl text-notblack-400" />
          </button>
          <h2 className="text-lg font-bold text-notblack-400">
            {routine?.name || "[Nombre de la rutina]"}
          </h2>
        </div>
      </div>

      <main className="flex flex-col justify-start">
        {/* Categorías */}
        <div className="mb-4 w-full">
          <CustomSelect
            value={selectedCategory || ""}
            onChange={(value) => {
              setSelectedCategory(value);
              setSearch("");
            }}
            placeholder="Selecciona una categoría"
            options={categories.map((cat) => ({
              value: cat._id,
              label: cat.name,
            }))}
            required
          />
        </div>
        {/* Buscador y ejercicios */}
        {exercises.length > 0 && (
          <>
            <div className="relative w-full mb-4">
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"></i>
              <input
                type="text"
                placeholder="Buscar ejercicio"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border border-secondary-400 placeholder-zinc-400 text-notblack-400 font-bold rounded-md p-3 pl-10 w-full focus:outline-gray-500"
                style={{ boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)" }}
              />
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {
                filteredExercises.map((ex) => {
                  const isSelected = ex._id === selectedExerciseId;
                  return (
                    <div
                      key={ex._id}
                      onClick={() => {

                        setSelectedExerciseId(ex._id)
                        console.log("Ejercicio seleccionado:", ex._id);
                      }}
                      className={`p-3 rounded-md cursor-pointer bg-white text-notblack-400 shadow-sm transition-all border-2 ${isSelected ? "border-accent-400" : "border-transparent"
                        }`}
                    >
                      {ex.name}
                    </div>
                  );
                })
              }
              {filteredExercises.length === 0 && (
                <p className="text-center text-notblack-400 italic">No se encontraron ejercicios.</p>
              )}
            </div>
          </>
        )}
      </main>

      {/* Botón final */}
        <Button
          text="Agregar ejercicio"
          icon={<i className="bi bi-bookmark text-lg" />}
          variant="primary"
          onClick={handleAddExercise}
        />
    </div>
  );
};
