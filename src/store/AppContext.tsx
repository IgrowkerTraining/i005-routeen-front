import { useContext, createContext, useState, ReactNode, useCallback } from "react";
import { athletesMock } from "../mocks/athletes";
import { Athlete, ToastMessage } from "../types";
import { ToastNotifier } from "../components/Notifier/Notifier";

interface AppContextType {
  store: {
    toasts: ToastMessage[];
    athletes: Athlete[];
    newAthleteId: string | null;
    athletePhone: string | null;
    athleteName: string | null; 
  };
  actions: {
    showToast: (id: number) => void;
    removeToast: (id: number) => void;
    searchStudents: (term: string) => void;
    setNewAthleteId: (id: string) => void;
    setAthletePhone: (phone: string) => void;
    setAthleteName: (name: string) => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([
    { id: 1, type: "info", message: "Sesión iniciada correctamente.", isVisible: false },
    { id: 2, type: "error", message: "Ocurrió un error al cargar los datos.", isVisible: false },
    { id: 3, type: "info", message: "Tu progreso fue actualizado.", isVisible: false },
    { id: 4, type: "info", message: "Alumno agregado correctamente.", isVisible: false },

  ]);
  const [athletes, setAthletes] = useState<Athlete[]>(athletesMock);
  const [newAthleteId, setNewAthleteIdState] = useState<string | null>(null);
  const [athletePhone, setAthletePhone] = useState<string | null>(null);
  const [athleteName, setAthleteNameState] = useState<string | null>(null);

  const showToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isVisible: true } : toast
      )
    );
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );
  }, []);

  const searchStudents = useCallback((term: string) => {
    const filteredStudents = athletesMock.filter(athlete =>
      athlete.name.toLowerCase().includes(term.toLowerCase())
    );
    setAthletes(filteredStudents);
  }, []);

  const setNewAthleteId = useCallback((id: string) => {
    setNewAthleteIdState(id);
  }, []);

  const setAthleteName = useCallback((name: string) => {
    setAthleteNameState(name);
  }, []);

  const store = { toasts, athletes, newAthleteId, athletePhone, athleteName };
  const actions = { showToast, removeToast, searchStudents, setNewAthleteId, setAthletePhone, setAthleteName };

  return (
    <AppContext.Provider value={{ store, actions }}>
      <ToastNotifier toasts={store.toasts} removeToast={actions.removeToast} />
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default useAppContext;
