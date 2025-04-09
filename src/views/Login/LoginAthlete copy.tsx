import LoginLayout from "./LoginLayout"
import Input from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../store/AuthContext"
import authAthlete from "../../logic/auth/authAthlete"
import { AuthAthleteInput } from "../../logic/interfaces/auth"

export default function LoginAthlete2() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [otpCode, setOtpCode] = useState("")
    const [error, setError] = useState("")


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const data: AuthAthleteInput = {
            otp_code: otpCode,
        }

        try {
            const res = await authAthlete(data)

            login({
                role: 'athlete',
                token: res.token
            })

            navigate("/home")
        } catch (err: any) {
            console.error(err)
            setError("Código inválido o error de conexión")
        }
    }

    return (
        <LoginLayout>
            <form onSubmit={handleLogin} className="flex flex-col items-center mt-2">
                <div className="flex flex-col items-center w-[370px]">
                    <Input
                        id="code"
                        type="text"
                        placeholder="Ingrese el código brindado por el entrenador"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}


                <div className="flex flex-col gap-4 w-full mt-4">
                    <Button
                        submit
                        text="Iniciar sesión"
                        variant="primary"
                    />
                </div>
            </form>
        </LoginLayout>
    )
}
