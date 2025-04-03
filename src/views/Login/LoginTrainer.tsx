import LoginLayout from "./LoginLayout"
import { Link } from "react-router-dom"
import Input from "../../components/Input/Input"

export default function LoginTrainer() {
    return (
        <LoginLayout
        className="mt-22">
            <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col items-center w-[370px]">
                   
                    <Input
                        id="email"
                        type="email"
                        placeholder="Ingrese el email"
                        
                    />
                    {/* Hay que crear un custom input para el password*/}
        
                    <Input
                        id="password"
                        type="password"
                        className="mt-4"
                        placeholder="Ingrese la contraseña"
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
