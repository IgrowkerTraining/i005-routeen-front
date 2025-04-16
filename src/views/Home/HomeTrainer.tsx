import AthleteCard from "../../components/cards/AthleteCard/AthleteCard";
import { Button } from "../../components/Button/Button";
import useAppContext from "../../store/AppContext";
import { ChangeEvent } from "react";

export default function HomeTrainer() {
    const { actions: { searchStudents } } = useAppContext()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        searchStudents(e.target.value)
    }

    return (
        <div className="min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <main className="flex flex-col px-4 pb-2 gap-6 sm:px-0">
                    <section className="flex justify-start items-center w-full gap-5">
                        <h2 className="text-[30px] text-notblack-400">
                            Lista de Alumnos
                        </h2>
                    </section>
                    <div className="flex justify-center items-center gap-2 w-full">
                        <div className="relative w-full">
                            {/* Añadir logica del buscador */}
                            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"></i>
                            <input
                                type="text"
                                placeholder="Buscar Alumno..."
                                className="bg-transparent border border-secondary-400 placeholder-zinc-400 text-notblack-400 font-bold rounded-md p-3 pl-10 w-full focus:outline-gray-500"
                                style={{
                                    boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)"

                                }}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <AthleteCard />
                    <Button
                        text="Agregar"
                        variant="primary"
                        href={"/add-athlete"}
                        icon={<i className="bi bi-person-fill-add"></i>}
                    />
                </main>
            </div>
        </div>
    )
}