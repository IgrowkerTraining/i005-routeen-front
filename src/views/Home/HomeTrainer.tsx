import { useEffect, useState, ChangeEvent } from "react"
import getTokenData from "../../logic/auth/getTokenData"
import getAthletes from "../../logic/trainer/getAthletes"
import AthleteCard from "../../components/cards/AthleteCard/AthleteCard"
import { Button } from "../../components/Button/Button"
import { Athlete } from "../../types"


export default function HomeTrainer() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([])
    const [search, setSearch] = useState("")
    
    useEffect(() => {
        const fetchAthletes = async () => {
          try {
            const tokenData = await getTokenData()
      
            if (tokenData?.role === "trainer") {
              const res = await getAthletes({ trainer_id: tokenData.id })
      
                const formatted = res.map((athlete: { _id: any }) => ({ 
                ...athlete,
                id: athlete._id,
               
              }))
      
              setAthletes(formatted)
              setFilteredAthletes(formatted)
            } else {
              console.error("El usuario no es entrenador o no tiene sesión activa")
            }
          } catch (err) {
            console.error("Error al obtener atletas:", err)
          }
        }
      
        fetchAthletes()
      }, [])

 /*  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const tokenData = await getTokenData()

        if (tokenData?.role === "trainer") {
          const res = await getAthletes({ trainer_id: tokenData.id })
          setAthletes(res)
          setFilteredAthletes(res)
        } else {
          console.error("El usuario no es entrenador o no tiene sesión activa")
        }
      } catch (err) {
        console.error("Error al obtener atletas:", err)
      }
    }

    fetchAthletes()
  }, []) */

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    const filtered = athletes.filter((athlete) =>
      athlete.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredAthletes(filtered)
  }

  return (
    <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
      <div className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
        <main className="flex flex-col  pb-2 gap-6 sm:px-0">
          <section className="flex justify-start items-center w-full gap-5">
            <h2 className="text-[30px] text-notblack-400">Lista de Alumnos</h2>
          </section>

          <div className="flex justify-center items-center gap-2 w-full">
            <div className="relative w-full">
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"></i>
              <input
                type="text"
                placeholder="Buscar Alumno..."
                className="bg-transparent border border-secondary-400 placeholder-zinc-400 text-notblack-400 font-bold rounded-md p-3 pl-10 w-full focus:outline-gray-500"
                style={{
                  boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)",
                }}
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>

          <AthleteCard athletes={filteredAthletes} onClearSearch={() => setSearch("")} />


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
