import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useState } from "react";

export function SignUp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === passwordRepeat) {
            console.log("Creando cuenta...")
        } else{
            console.log('Las contraseñas no coinciden')
            return
        }

        setTimeout(() => {
            navigate("/home")
        }, 500)
    }
    
    return (
        <>
            <header className="fixed top-0 w-full bg-white flex items-center justify-between p-4 text-gray-900">
                <i className="bi bi-arrow-left text-2xl"></i>
                <h2 className="font-semibold flex-1 text-center text-md">Crear cuenta</h2>
            </header>

            <main className="p-6 mt-12">
                <p className="mb-4 text-gray-700">
                    Antes de comenzar completa las siguientes informaciones:
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <Input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Ingrese e-mail"
                    />
                    <Input
                        type="password"
                        placeholder="Ingrese contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Confirmar contraseña"
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                    />

                    <div className="flex justify-center">
                        <Button
                        submit
                        text="Confirmar"
                        variant="primary"
                        className="w-40"
                        />
                    </div>
                </form>
            </main>
        </>
    )

}
