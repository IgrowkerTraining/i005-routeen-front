import { Button } from "../../components/Button/Button";
import ExerciceCard from "../../components/cards/ExerciceCard/ExerciceCard";
import { Link } from "react-router-dom";

export default function HomeAthlete() {
    return (
        <main className="flex flex-col justify-between h-screen px-4 pb-2 gap-6">

            <section className="flex flex-col justify-start w-full gap-5">

                <h2 className="text-[30px] text-notblack-400 ">
                    Te damos la bienvenida
                </h2>
                <div className="flex justify-start items-center gap-5 w-full ">
                    <Link to="/routine"
                        className="text-primary-400 font-[600] underline  underline-offset-2"
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
            </section>
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