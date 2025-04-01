import { useContext, createContext, useState, ReactNode } from "react";

interface AppContextType {
  store: {
    ejemplo: number;
  };
  actions: {
    setEjemplo: React.Dispatch<React.SetStateAction<number>>;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [ejemplo, setEjemplo] = useState<number>(0);

  const store = { ejemplo };
  const actions = { setEjemplo };

  return (
    <AppContext.Provider value={{ store, actions }}>
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
