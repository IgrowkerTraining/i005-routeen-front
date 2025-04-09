import LoginLayout from "./LoginLayout"
import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { useState } from "react"
import authAthlete from "../../logic/auth/authAthlete"
import { AuthAthleteInput } from "../../logic/interfaces/auth"

export default function LoginAthlete() {
    const navigate = useNavigate()
    const [otpCode, setOtpCode] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const data: AuthAthleteInput = {
            otp_code: otpCode,
        }

        try {
            await authAthlete(data);
            navigate("/home");
        } catch (err: any) {
            console.error(err)
            setError("Código inválido o error de conexión")
        }
    }

    return (
        <LoginLayout className="">
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-3 ">
                <div className="flex flex-col items-center w-[370px]">
                    <Input
                        id="otpCode"
                        type="text"
                        placeholder="Ingrese su código OTP"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
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
                    <Link to="/register" className="text-primary-400 font-[600] underline underline-offset-1">
                        Registrarse
                    </Link>
                </div>
            </form>
        </LoginLayout>
    )
}
