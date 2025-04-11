import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'
import getTokenData from '../logic/auth/getTokenData'

interface User {
    role: 'trainer' | 'athlete'
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (role: 'trainer' | 'athlete') => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const hasFetched = useRef(false)

    const login = (role: 'trainer' | 'athlete') => {
        setUser({ role })
    }

    const logout = () => {
        setUser(null)
    }

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        (async () => {
            try {
                const data = await getTokenData()
                if (data?.role) {
                    setUser({ role: data.role });
                }
            } catch (error) {
                console.log('No hay sesión activa')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
    return context
};
