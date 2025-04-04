import LoginLayout from "./LoginLayout"
import Input from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function LoginAthlete() {
    const navigate = useNavigate()
    const [code, setCode] = useState("")
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Loggin in...")

        setTimeout(() => {
            navigate("/home")
        }, 500)

    }
    return (
        <LoginLayout>
            <form onSubmit={handleLogin} className="flex flex-col items-center mt-2">
                <div className="flex flex-col items-center w-[370px]">
                    <Input
                        id="email"
                        type="e-mail"
                        placeholder="Ingrese el codigo brindado por el entrenador"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

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
