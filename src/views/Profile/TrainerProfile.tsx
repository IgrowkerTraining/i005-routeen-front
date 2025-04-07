import { Button } from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function TrainerProfile() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Loggin in...")

        setTimeout(() => {
            navigate("/home")
        }, 500)

    }
    return (
        <form className="flex h-screen justify-between flex-col px-4 pb-4">

            <section className="flex  items-center w-full gap-5">

                <h2 className="text-[30px] text-notblack-400 ">
                    Ingresar datos personales
                </h2>
            </section>
            <div className="flex flex-col justify-center not-odd:w-full gap-4">
                <Input
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    id="email"
                    type="email"
                    placeholder="Ingrese el e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    id="phone"
                    type="number"
                    placeholder="Teléfono"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    id="profession"
                    type="text"
                    placeholder="Profesión"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <section className="flex justify-between items-center w-full gap-5 p-3">
                <i className="bi bi-person-circle text-9xl"></i>

                {/* Añadir funcionalidad subir imagen */}

                <button
                    onClick={() => console.log("Subir foto perfil")}
                    className="bg-primary-400 text-notwhite-400 px-5 py-2.5 rounded-md shadow-md shadow-gray-400"
                >
                    Subir foto de perfil
                </button>

            </section>
            {/* Añadir funcionalidad, siguiente es ir a home? */}
            <Button
                text="Siguiente"
                variant="primary"
                href="/home"
            />
        </form>
    )
}

