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
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("");

        if (!validateEmail(email)) {
            setError("Por favor, ingresa un email válido");
            return;
        }

        if (!validatePassword(password)) {
            return setError("La contraseña debe tener al menos 8 caracteres, una letra, un número y un carácter especial.");
        }

        if (password !== passwordRepeat) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            await saveRegisterCredentials({ email, password, repeat_password: passwordRepeat });
            navigate("/complete-profile");
        } catch (err: any) {
            console.error("Error en el guardado de registro:", err);
            setError("Ocurrió un error al guardar los datos. Por favor, intenta de nuevo.");
        }
    }

    return (
        <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <header className="w-full flex items-center justify-between p-4 text-gray-900 sm:p-0 sm:mb-4">
                    <i className="bi bi-arrow-left text-2xl"></i>
                    <h2 className="font-semibold flex-1 text-center text-md">Crear cuenta</h2>
                </header>

                <main className="sm:p-0">
                    <p className="mb-4 text-gray-700 pb-3">
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
                            <div className="flex items-center gap-2 p-3 mb-2 text-red-700 bg-red-100 border border-red-300 rounded-lg text-sm w-full transition-all duration-300 animate-fade-in">
                                <i className="bi bi-exclamation-circle-fill text-lg"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-4 w-full">
                            <Button submit text="Siguiente" variant="primary" />
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}   
