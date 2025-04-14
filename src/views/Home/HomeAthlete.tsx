import { Button } from "../../components/Button/Button";
import ExerciceCard from "../../components/cards/ExerciceCard/ExerciceCard";
import { Link } from "react-router-dom";

export default function HomeAthlete() {
    return (
        <div className="min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <main className="flex flex-col px-4 pb-2 gap-6 sm:px-0">
                    <section className="flex justify-start items-center w-full gap-5">
                        <h2 className="text-[30px] text-notblack-400">
                            Te damos la bienvenida
                        </h2>
                    </section>

                    <div className="flex justify-start items-center gap-5 w-full">
                        <Link to="/routine"
                            className="text-primary-400 font-[600] underline underline-offset-2"
                        >
                            Plan de hoy
                        </Link>
                        <Link to="/progress"
                            className="text-primary-400 font-[600] underline underline-offset-2"
                        >
                            Progreso
                        </Link>
                    </div>
                    <ExerciceCard />
                    <Button
                        text="Agregar"
                        variant="primary"
                        onClick={() => console.log("Agregar Alumno")}
                        icon={<i className="bi bi-person-fill-add"></i>}
                    />
                </main>
            </div>
        </div>
    )
}