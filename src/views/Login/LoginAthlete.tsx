import LoginLayout from "./LoginLayout";
export default function LoginAthlete() {
    return (
        <LoginLayout>
            <div className="flex flex-col items-center mt-2">
                <div className="flex flex-col items-center w-[370px]">
                    <input
                        type="email"
                        placeholder="Ingrese el codigo brindado por el entrenador"
                        className="bg-transparent border border-secondary-400 w-full  px-4 py-2 rounded-md text-black placeholder-gray-400"
                        style={{
                            boxShadow: 'inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)'
                        }}
                    />
                    {/* Hay que crear un custom input para el password*/}
                   
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
