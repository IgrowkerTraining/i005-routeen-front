import AthleteCard from "../../components/cards/AthleteCard/AthleteCard";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useAppContext from "../../store/AppContext";
import { ChangeEvent } from "react";

export default function HomeTrainer() {
    const { actions: {searchStudents} } = useAppContext()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        searchStudents(e.target.value)
    }

    return (
        <main className="flex flex-col px-4 pb-2 gap-6">
            <section className="flex justify-start items-center w-full gap-5">

                <h2 className="text-[30px] text-notblack-400 ">
                    Lista de Alumnos
                </h2>
            </section>

            <div className="flex justify-center items-center gap-2 w-full">
                <div className="relative w-full">
                    {/* Añadir logica del buscador */}
                    <Input
                        type="text"
                        placeholder="Buscar Alumno..."
                        onChange={handleSearch}
                        className="bg-transparent border border-secondary-400 placeholder-zinc-400 rounded-md p-3 pl-10 w-full"
                    />
                    <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"></i>
                </div>
            </div>
            <AthleteCard />
            <Button
                text="Agregar"
                variant="primary"
                onClick={() => console.log("Agregar Alumno")}
                icon={<i className="bi bi-person-fill-add "></i>}
            />
        </main>
    )
}