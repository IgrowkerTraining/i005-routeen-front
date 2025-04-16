import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Athlete } from "../types";

interface RoutineContextType {
  routine: any; // Define el tipo de rutina según tu modelo de datos
  fetchRoutine: (athleteId: string) => void;
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

interface RoutineProviderProps {
  children: ReactNode;
}

export const RoutineProvider: React.FC<RoutineProviderProps> = ({ children }) => {
  const [routine, setRoutine] = useState<any>(null); // Aquí puedes definir un tipo más específico para la rutina

  const fetchRoutine = useCallback(async (athleteId: string) => {
    try {
      const response = await fetch(`/api/routine/${athleteId}`); // Aquí tu endpoint para obtener la rutina
      const data = await response.json();
      setRoutine(data);
    } catch (error) {
      console.error("Error fetching routine:", error);
    }
  }, []);

  return (
    <RoutineContext.Provider value={{ routine, fetchRoutine }}>
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
