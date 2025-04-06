import AthleteCard from "../../components/cards/AthleteCard/AthleteCard";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";

export default function HomeTrainer() {
    return (
        <main className="flex flex-col px-4 pb-2 gap-6">

            <section className="flex justify-start items-center w-full gap-5 undefined">

                <h2 className="text-[40px] text-center  font-title">
                    Lista de Alumnos
                </h2>
            </section>
            <div className="flex justify-center items-center gap-2 w-full">
                <div className="relative w-full">
                    <Input
                        type="text"
                        placeholder="Buscar Alumno..."
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
                icon={<i className="bi bi-person-fill-add "></i>
                }
            />
        </main>

    )
}