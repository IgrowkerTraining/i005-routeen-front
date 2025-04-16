import { useContext, createContext, useState, ReactNode, useCallback } from "react"
import { athletesMock } from "../mocks/athletes"
import { routinesMock } from "../mocks/exercices"
import { Athlete, Routine, ToastMessage } from "../types"

interface AppContextType {
  store: {
    toasts: ToastMessage[],
    athletes: Athlete[]
    routines: Routine[]
  }
  actions: {
    showToast: (id: number) => void;
    removeToast: (id: number) => void;
    searchStudents: (term: string) => void;
    searchRoutines: (term: string) => void;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([
    { id: 1, type: "success", message: "Sesión iniciada correctamente.", isVisible: false },
    { id: 2, type: "error", message: "Ocurrió un error al cargar los datos.", isVisible: false },
    { id: 3, type: "info", message: "Tu progreso fue actualizado.", isVisible: false },
  ])
  const [athletes, setAthletes] = useState<Athlete[]>(athletesMock)
  const [routines, setRoutines] = useState<Routine[]>(routinesMock)

  const showToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isVisible: true } : toast
      )
    )
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    )
  }, [])

  const searchStudents = useCallback((term: string) => {
    const filteredStudents = athletesMock.filter(athlete =>
      athlete.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    )
    setAthletes(filteredStudents)
  }, [])

  const searchRoutines = useCallback((term: string) => {
    const lowerTerm = term.toLowerCase();
    const filteredRoutines = routines.filter(routine =>
      // Se verifica si el nombre de la rutina incluye el término...
      routine.name.toLowerCase().includes(lowerTerm) ||
      // ...o si alguno de los ejercicios de la rutina incluye el término en su nombre.
      routine.exercises.some(exercise =>
        exercise.name.toLowerCase().includes(lowerTerm)
      )
    );
    setRoutines(filteredRoutines);
  }, []);
  

  const store = { toasts, athletes, routines }
  const actions = { showToast, removeToast, searchStudents, searchRoutines }

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export default useAppContext
