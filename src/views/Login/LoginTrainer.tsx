import LoginLayout from "./LoginLayout"
import { Link } from "react-router-dom"

export default function LoginTrainer() {
    return (
        <LoginLayout
        className="mt-22">
            <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col items-center w-[370px]">
                    <input
                        type="email"
                        placeholder="Ingrese el email"
                        className="bg-transparent border border-secondary-400 w-full  px-4 py-2 rounded-md text-black placeholder-gray-400"
                        style={{
                            boxShadow: 'inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)'
                        }}
                    />
                    {/* Hay que crear un custom input para el password*/}
                    <input
                        type="password"
                        placeholder="Ingrese la contraseña"
                        className="bg-transparent border border-secondary-400 w-full shadow-inner shadow-gray-400 px-4 py-2 rounded-md text-black placeholder-gray-400 mt-4"
                        style={{
                            boxShadow: 'inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)'
                        }}
                    />
                </div>
                <button
                    className="bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-4 shadow-md shadow-gray-400 "
                >
                    Iniciar sessión
                </button>
                <Link to="/register"
                    className="text-primary-400 font-[600] underline underline-offset-1"
                >
                    Registrarse
                </Link>

            </div>
        </LoginLayout>
    )

}
