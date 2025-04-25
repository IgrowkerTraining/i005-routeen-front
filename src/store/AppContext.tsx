import { useContext, createContext, useState, ReactNode, useCallback } from "react";
import { Athlete, ToastMessage } from "../types";
import { ToastNotifier } from "../components/Notifier/Notifier";

interface AppContextType {
  store: {
    toasts: ToastMessage[];
    athletes: Athlete[];
    newAthleteId: string | null;
    athletePhone: string | null;
    athleteName: string | null;
    athleteId: string | null;
  };
  actions: {
    showToast: (id: number) => void;
    removeToast: (id: number) => void;
    setNewAthleteId: (id: string) => void;
    setAthletePhone: (phone: string) => void;
    setAthleteName: (name: string) => void;
    setAthletes: (athletes: Athlete[]) => void;
    setAthleteId: (id: string) => void;
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
    { id: 5, type: "error", message: "Ese email ya está en uso.", isVisible: false },
    { id: 6, type: "error", message: "Ese número de teléfono ya está en uso.", isVisible: false },
    { id: 7, type: "error", message: "Entrenador no encontrado.", isVisible: false },
    { id: 8, type: "error", message: "Hubo un problema al validar los datos.", isVisible: false },
    { id: 9, type: "error", message: "Formato de fecha inválido. Debe ser YYYY-MM-DD.", isVisible: false },
    { id: 10, type: "error", message: "Formato de teléfono inválido. Debe tener entre 8 y 15 dígitos.", isVisible: false },
    { id: 11, type: "error", message: "Formato de email inválido. Verificá que esté bien escrito.", isVisible: false },
    { id: 12, type: "error", message: "Formato de nombre inválido. Usá solo letras, espacios y guiones.", isVisible: false },
    { id: 13, type: "error", message: "El objetivo del alumno es obligatorio. Por favor completalo.", isVisible: false },
    { id: 14, type: "info", message: "Usuario registrado correctamente.", isVisible: false },
  ]);

  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [newAthleteId, setNewAthleteIdState] = useState<string | null>(null);
  const [athletePhone, setAthletePhone] = useState<string | null>(null);
  const [athleteName, setAthleteNameState] = useState<string | null>(null);
  const [athleteId, setAthleteIdState] = useState<string | null>(null);

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

 

  const updateAthletes = useCallback((newAthletes: Athlete[]) => {
    setAthletes(newAthletes);
  }, []);

  const setNewAthleteId = useCallback((id: string) => {
    setNewAthleteIdState(id);
  }, []);

  const setAthleteName = useCallback((name: string) => {
    setAthleteNameState(name);
  }, []);

  const setAthleteId = useCallback((id: string) => {
    setAthleteIdState(id);
  }, []);

  const store = { toasts, athletes, newAthleteId, athletePhone, athleteName, athleteId };
  const actions = {
    showToast,
    removeToast,
    setNewAthleteId,
    setAthletePhone,
    setAthleteName,
    setAthletes: updateAthletes,
    setAthleteId,
  };

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
