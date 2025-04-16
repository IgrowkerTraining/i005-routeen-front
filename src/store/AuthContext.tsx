import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react'
import getTokenData from '../logic/auth/getTokenData'
import registerTrainer from '../logic/trainer/registerTrainer'
import logoutUser from '../logic/auth/logout'

interface User {
  role: 'trainer' | 'athlete'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (role: 'trainer' | 'athlete') => void
  logout: () => void
  register: (data: {
    name: string
    email: string
    password: string
    repeat_password: string
    phone: string
    date_birth: string
    file: File
  }) => Promise<void>
  tempRegisterData: {
    email: string
    password: string
    repeat_password: string
  } | null
  saveRegisterCredentials: (data: {
    email: string
    password: string
    repeat_password: string
  }) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const hasFetched = useRef(false)
  const [tempRegisterData, setTempRegisterData] = useState<{
    email: string
    password: string
    repeat_password: string
  } | null>(null)

  const saveRegisterCredentials = (data: {
    email: string
    password: string
    repeat_password: string
  }) => {
    setTempRegisterData(data)
  }
  const login = (role: 'trainer' | 'athlete') => {
    setUser({ role })
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    ;(async () => {
      try {
        const data = await getTokenData()
        if (data?.role) {
          setUser({ role: data.role })
        }
      } catch (error) {
        console.log('No hay sesión activa')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const register = async (data: {
    name: string
    email: string
    password: string
    repeat_password: string
    phone: string
    date_birth: string
    file: File
  }) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('repeat_password', data.repeat_password)
      formData.append('phone', data.phone)
      formData.append('date_birth', data.date_birth)
      formData.append('file', data.file)

      await registerTrainer(formData)
      setUser({ role: 'trainer' })
    } catch (err) {
      console.error('Error al registrar:', err)
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        tempRegisterData,
        saveRegisterCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return context
}
