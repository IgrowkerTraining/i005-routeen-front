import { useContext, createContext, useState, ReactNode, useCallback } from "react"

import { routinesMock } from "../mocks/routines"
import {  Routine  } from "../types"

interface RoutinesContextDType {
  store: {
    routines: Routine[]
  }
  actions: {
    searchRoutines: (term: string) => void;
  }
}

const RoutinesContextD = createContext<RoutinesContextDType | undefined>(undefined)

interface RoutinesProviderProps {
  children: ReactNode
}

export const RoutinesDProvider: React.FC<RoutinesProviderProps> = ({ children }) => {
  const [routines, setRoutines] = useState<Routine[]>(routinesMock)

  const searchRoutines = useCallback((term: string) => {
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
  }, []);


  const store = {routines }
  const actions = {  searchRoutines }

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
