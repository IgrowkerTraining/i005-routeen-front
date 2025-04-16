

import ExerciceCard from "../../components/cards/ExerciceCard/ExerciceCard";
import { Button } from "../../components/Button/Button";
import useAppContext from "../../store/AppContext";
import { ChangeEvent } from "react";
import InputCalendar from "../../components/Calendar/InputCalendar";
import { useParams } from "react-router-dom";
export const AddNewRoutine = () => {
    const { id } = useParams<{ id: string }>();

    const { actions: { searchRoutines } } = useAppContext()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        searchRoutines(e.target.value)
    }

    return (
        <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
            <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <main className="flex flex-col pb-2 gap-6 sm:px-0">

                    <div className="flex justify-center items-center gap-2 w-full">
                        <div className="relative w-full">
                            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"></i>
                            <input
                                type="text"
                                placeholder="Buscar Rutina..."
                                className="bg-transparent border border-secondary-400 placeholder-zinc-400 text-notblack-400 font-bold rounded-md p-3 pl-10 w-full focus:outline-gray-500"
                                style={{
                                    boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)"

                                }}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <ExerciceCard />
                    <InputCalendar
                        id="date"
                        label="Seleccionar dia"
                        isRequired
                    />
                    <Button
                        text="Agregar nueva rutina"
                        variant="primary"
                        href={`/athlete/${id}/routine/new`}
                        icon={<i className="bi bi-plus text-2xl"></i>}
                    />
                </main>
            </div>
        </div>
    )
}