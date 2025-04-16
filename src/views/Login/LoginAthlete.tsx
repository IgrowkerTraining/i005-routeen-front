import LoginLayout from "./LoginLayout"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { useState } from "react"
import authAthlete from "../../logic/auth/authAthlete"
import { AuthAthleteInput } from "../../logic/interfaces/auth"
import { useAuth } from "../../store/AuthContext"

export default function LoginAthlete() {
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
            await authAthlete(data);      // Backend auth
            login('athlete');
            navigate("/home");
        } catch (err: any) {
            console.error('Error completo:', {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
                config: err.config
            });
            setError("Código inválido o error de conexión")
        }
    }

    return (
        <LoginLayout className="">
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-3 w-full ">
                <div className="flex flex-col items-center w-full">
                    <Input
                        id="otpCode"
                        type="text"
                        placeholder="Ingrese su código OTP"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        label
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="flex flex-col gap-4 w-full">
                    <Button
                        submit
                        text="Ingresar"
                        variant="primary"
                    />
                </div>
            </form>
        </LoginLayout>
    )
}
