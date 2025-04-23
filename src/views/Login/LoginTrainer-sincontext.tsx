import LoginLayout from "./LoginLayout"
import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { useState } from "react"
import authTrainer from "../../logic/auth/authTrainer"
import { AuthTrainerInput } from "../../logic/interfaces/auth"

export default function LoginTrainer() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/home', { replace: true })
        setError("");

        const data: AuthTrainerInput = {
            email,
            password,
        };

        try {
            console.log('Iniciando autenticación...');
            await authTrainer(data);
            console.log('Autenticación exitosa, navegando a home...');
            navigate("/home", { state: { role: 'trainer' } });
        } catch (err: any) {
            console.error('Error completo:', {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
                config: err.config
            });
            setError("Credenciales inválidas o error de conexión")
        }
    };

    return (
        <LoginLayout className="">
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-3 ">
                <div className="flex flex-col items-center w-[370px]">
                    <Input
                        id="email"
                        type="email"
                        placeholder="Ingrese el email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        id="password"
                        type="password"
                        className="mt-4"
                        placeholder="Ingrese la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="flex flex-col gap-4 w-full">
                    <Button
                        submit
                        text="Iniciar sesión"
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
