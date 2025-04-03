import LoginLayout from "./LoginLayout"
import Input from "../../components/Input/Input"
export default function LoginAthlete() {
    return (
        <LoginLayout>
            <div className="flex flex-col items-center mt-2">
                <div className="flex flex-col items-center w-[370px]">
                    <Input
                        id="email"
                        type="e-mail"
                        placeholder="Ingrese el codigo brindado por el entrenador"
                    />
                </div>
                <button
                    className="bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-5 shadow-md shadow-gray-400 "
                >
                    Iniciar sessión
                </button>
               

            </div>
        </LoginLayout>
    )

}
