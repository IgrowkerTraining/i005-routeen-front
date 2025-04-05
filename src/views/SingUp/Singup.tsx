import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";

export function Singup() {
    
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
                <form className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Ingrese e-mail"
                    />
                    <Input
                        type="password"
                        placeholder="Ingrese contraseña"
                    />
                    <Input
                        type="password"
                        placeholder="Confirmar contraseña"
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
