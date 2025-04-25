import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { RoutineExercise } from "../logic/interfaces/exercice"; // 👈 Asegurate que el path esté correcto

interface RoutineContextType {
  routine: any; // Podés tiparlo mejor si querés
  fetchRoutine: (athleteId: string) => void;
  exercises: RoutineExercise[];
  setExercises: (exs: RoutineExercise[]) => void;
  routineId: string | null; // Nuevo estado para almacenar el routineId
  setRoutineId: (id: string | null) => void; /// Función para actualizar el routineId
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

interface RoutineProviderProps {
  children: ReactNode;
}

export const RoutineProvider: React.FC<RoutineProviderProps> = ({ children }) => {
  const [routine, setRoutine] = useState<any>(null); // Idealmente tipar mejor
  const [exercises, setExercises] = useState<RoutineExercise[]>([]);
  const [routineId, setRoutineId] = useState<string | null>(null); // Nuevo estado para el routineId

  const fetchRoutine = useCallback(async (athleteId: string) => {
    try {
      const response = await fetch(`/api/routine/${athleteId}`);
      const data = await response.json();
      setRoutine(data);
    } catch (error) {
      console.error("Error fetching routine:", error);
    }
  }, []);

  return (
    <RoutineContext.Provider
      value={{
        routine,
        fetchRoutine,
        exercises,
        setExercises,
        routineId, // Pasando el routineId al contexto
        setRoutineId, // Pasando la función setRoutineId al contexto
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutineContext = (): RoutineContextType => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error("useRoutineContext debe ser usado dentro de RoutineProvider");
  }
  return context;
};
