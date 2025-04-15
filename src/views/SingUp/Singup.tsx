import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useState } from "react"
import { useAuth } from "../../store/AuthContext";

export function SignUp() {
    const navigate = useNavigate()
    const { saveRegisterCredentials } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("");

        if (!validateEmail(email)) {
            setError("Por favor, ingresa un email válido");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (password !== passwordRepeat) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            saveRegisterCredentials({ email, password, repeat_password: passwordRepeat })
            navigate("/complete-profile")
        } catch (err) {
            console.error("Error en el registro:", err)
            setError("Error al registrar el usuario")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <header className="w-full flex items-center justify-between p-4 text-gray-900 sm:p-0 sm:mb-4">
                    <i className="bi bi-arrow-left text-2xl"></i>
                    <h2 className="font-semibold flex-1 text-center text-md">Crear cuenta</h2>
                </header>

                <main className="p-6 sm:p-0">
                    <p className="mb-4 text-gray-700">
                        Antes de comenzar completa la información de tu cuenta:
                    </p>
                    <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleRegister}>
                        <Input
                            id="email"
                            value={email}
                            type="email"
                            placeholder="Ingresar e-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            label
                        />
                        <Input
                            id="password"
                            value={password}
                            type="password"
                            placeholder="Ingresar contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            label
                        />
                        <Input
                            id="passwordRepeat"
                            value={passwordRepeat}
                            type="password"
                            placeholder="Confirmar contraseña"
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            label
                        />

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <div className="flex justify-center w-full">
                            <Button
                                submit
                                text="Siguiente"
                                variant="primary"
                            />
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}   
