import { useContext, createContext, useState, ReactNode, useCallback } from "react"
import { ToastType } from "../components/Notifier/Notifier"

interface ToastMessage {
  id: number
  type: ToastType
  message: string
  isVisible: boolean 
}

interface AppContextType {
  store: {
    toasts: ToastMessage[]
  }
  actions: {
    showToast: (id: number) => void 
    removeToast: (id: number) => void
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

  const store = { toasts }
  const actions = { showToast, removeToast }

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
