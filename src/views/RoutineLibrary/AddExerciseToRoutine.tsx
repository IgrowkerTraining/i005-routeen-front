import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import getRoutineById from "../../logic/routines-exercices/getRoutineById"
import getAllCategories from "../../logic/exercises/getAllCategories"
import getExercisesByCategory from "../../logic/exercises/getExercisesByCategory"
import assignExerciseToRoutine from "../../logic/routines-exercices/assignExerciseToRoutine"
import { Button } from "../../components/Button/Button"
import CustomSelect from "../../components/CustomSelect/CustomSelect"
import Input from "../../components/Input/Input"
import { Routine } from "../../types"
import { Exercise } from "../../types"

interface Category {
  _id: string
  name: string
}

export const AddExerciseToRoutine = () => {
  const { id: routineId } = useParams()
  const navigate = useNavigate()

  const [routine, setRoutine] = useState<Routine | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [series, setSeries] = useState("")
  const [reps, setReps] = useState("")
  const [weight, setWeight] = useState("")

  useEffect(() => {
    getRoutineById(routineId!).then(setRoutine)
    getAllCategories().then(setCategories)
  }, [routineId])

  useEffect(() => {
    if (selectedCategory) {
      getExercisesByCategory(selectedCategory).then((data) => {
        setExercises(data)
        setFilteredExercises(data)
      })
    }
  }, [selectedCategory])

  useEffect(() => {
    const filtered = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredExercises(filtered)
  }, [search, exercises])

  const handleAddExercise = async () => {
    if (!routineId || !selectedExerciseId || !series || !reps) {
      console.error("Faltan campos por completar")
      return
    }

    try {
      const res = await assignExerciseToRoutine({
        routine_id: routineId,
        exercise_id: selectedExerciseId,
        series: Number(series),
        reps: Number(reps),
        weight_kg: Number(weight),
      })
      setSelectedExerciseId(null)
      setSeries("")
      setReps("")
      setWeight("")
      console.log(`Ejercicio añadido correctamente: ${res}`)
    } catch (err) {
      console.error("Error al asignar ejercicio a rutina", err)
    }
  }

  const handleFinishRoutine = () => {
    navigate(`/library/`)
  }

  return (
    <div className="min-h-screen bg-notwhite-400 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left text-2xl text-notblack-400" />
          </button>
          <h2 className="text-lg font-bold text-notblack-400">
            {routine?.name}
          </h2>
        </div>
      </div>

      {/* Categorías */}
      <div className="mb-4 w-full">
        <CustomSelect
          value={selectedCategory || ""}
          onChange={(value) => {
            setSelectedCategory(value)
            setSearch("")
          }}
          placeholder="Selecciona una categoría"
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          required
        />
      </div>

      {/* Buscador */}
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

      {/* Lista de ejercicios */}

      <div className="flex flex-col gap-2 mb-6">
        {filteredExercises.map((exercise) => {
          const isSelected = exercise._id === selectedExerciseId
          return (
            <div
              key={exercise._id}
              onClick={() => setSelectedExerciseId(exercise._id)}
              className={`p-3 rounded-md cursor-pointer bg-white text-notblack-400 shadow-sm transition-all border-2 ${isSelected ? "border-accent-400" : "border-transparent"}`}
            >
              {exercise.name}
            </div>
          )
        })}
        {filteredExercises.length === 0 && (
          <p className="text-center text-notblack-400 italic">No se encontraron ejercicios.</p>
        )}
      </div>

      {/* Formulario de asignación */}
      {selectedExerciseId && (
        <div className="flex flex-col gap-2 mb-4">
          <Input
            label
            placeholder="Series"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />
          <Input
            label
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />

          <Input
            label
            placeholder="Peso (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      )}

      {/* Botones finales */}
      <div className="flex flex-col gap-2">
        <Button
          text="Agregar ejercicio"
          icon={<i className="bi bi-bookmark text-lg" />}
          variant="primary"
          onClick={handleAddExercise}
        />
        <Button
          text="Terminar rutina"
          icon={<i className="bi bi-check-circle text-lg" />}
          variant="primary"
          className="bg-accent-400! text-primary-400!"
          onClick={handleFinishRoutine}
        />
      </div>
    </div>
  )
}