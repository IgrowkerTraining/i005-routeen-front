import LoginLayout from './LoginLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { useState } from 'react'
import authTrainer from '../../logic/auth/authTrainer'
import { AuthTrainerInput } from '../../logic/interfaces/auth'
import useAppContext from '../../store/AppContext'

export default function LoginTrainer() {
  const navigate = useNavigate()
  const { actions } = useAppContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleGoToSignUp = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/register')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const data: AuthTrainerInput = {
      email,
      password,
    }

    try {
      await authTrainer(data)
      navigate('/home')
      actions.showToast(1)
    } catch (err: any) {
      console.error('Error completo:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        config: err.config,
      })
      actions.showToast(2)
      setError('Credenciales inválidas o error de conexión')
    }
  }

  return (
    <LoginLayout className="">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-3 w-full"
      >
        <div className="flex flex-col items-center w-full gap-4">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label
            required
          />

          <Input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label
            required
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-2 text-red-700 bg-red-100 border border-red-300 rounded-lg text-sm w-full transition-all duration-300 animate-fade-in">
            <i className="bi bi-exclamation-circle-fill text-lg"></i>
            <span>{error}</span>
          </div>
        )}
        <div className="flex flex-col gap-4 w-full">
          <Button submit text="Iniciar sesión" variant="primary" />
        </div>
      </form>
      <button
        onClick={handleGoToSignUp}
        className="text-primary-400 font-[600] underline underline-offset-1 ml-1 mt-4"
      >
        Registrarse
      </button>
    </LoginLayout>
  )
}
