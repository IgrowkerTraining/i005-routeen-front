import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { RoutineAssigned } from "../logic/interfaces/trainer";
import getRoutinesByAthleteId from "../logic/trainer/getRoutinesByAthleteId";


interface RoutinesContextDType {
  store: {
    routines: RoutineAssigned[] | null
  }
  actions: {
    //searchRoutines: (term: string) => void;
    fetchRoutines: (athleteId: string) => Promise<void>;

  }
}

const RoutinesContextD = createContext<RoutinesContextDType | undefined>(undefined)

interface RoutinesProviderProps {
  children: ReactNode
}

export const RoutinesDProvider: React.FC<RoutinesProviderProps> = ({ children }) => {
  const [routines, setRoutines] = useState<RoutineAssigned[] | null>(null);

  const fetchRoutines = useCallback(async (athleteId: string) => {
    try {
      const res = await getRoutinesByAthleteId(athleteId);
      const formatted = res.routinesAssigned.map((routine) => ({
        ...routine,
        id: routine.routine_id,
      }));
      setRoutines(formatted);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  }, []);

  /*  const searchRoutines = useCallback((term: string) => {
     const lowerTerm = term.toLowerCase();
     if (!term) {
       setRoutines(routinesMock)
       return;
     }
     const filteredRoutines = routines.filter(routine =>
       routine.name.toLowerCase().includes(lowerTerm) ||
       routine.exercises.some(exercise =>
         exercise.name.toLowerCase().includes(lowerTerm)
       )
     );
     setRoutines(filteredRoutines);
   }, []); */


  const store = { routines }
  const actions = { fetchRoutines };

  return (
    <RoutinesContextD.Provider value={{ store, actions }}>
      {children}
    </RoutinesContextD.Provider>
  )
}

const useRoutinesContextD = (): RoutinesContextDType => {
  const context = useContext(RoutinesContextD)
  if (!context) {
    throw new Error("RoutinesContextD must be used within an AppProvider")
  }
  return context
}

export default useRoutinesContextD
