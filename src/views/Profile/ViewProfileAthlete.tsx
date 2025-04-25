import { useEffect, useState } from "react"
import getAthleteInfo from "../../logic/athlete/getAthleteInfo"
import getTokenData from "../../logic/auth/getTokenData"
import { PencilIcon } from "lucide-react"
import { Athlete } from "../../types"
import { Link } from "react-router-dom"

export default function ViewProfileAthlete() {
  const [athleta, setAthleta] = useState<Athlete>()

  useEffect(() => {
    const fetchAthleteData = async () => {
      const tokenData = await getTokenData()
      if (tokenData?.role === 'athlete') {
        const id = tokenData.id

        try {
          const data = await getAthleteInfo({ id })
          setAthleta(data)
        } catch (error) {
          console.error('Error al obtener datos del atleta:', error)
        }
      }
    }

    fetchAthleteData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6">
      <img
        src={athleta?.profile_picture_url}
        alt="Foto de perfil"
        className="w-28 h-28 rounded-full object-cover shadow-md"
      />

      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
        <h2 className="font-bold text-slate-800 mb-2">Datos personales</h2>
        <div className="text-gray-700 space-y-1 text-sm">
          <p><span className="font-semibold">Nombre:</span>&nbsp;{athleta?.name}</p>
          <p><span className="font-semibold">E-mail:</span>&nbsp;{athleta?.email}</p>
          <p><span className="font-semibold">Teléfono:</span>&nbsp;{athleta?.phone}</p>
          <p><span className="font-semibold">Fecha de nacimiento:</span>&nbsp;{athleta?.date_birth}</p>
          <p><span className="font-semibold">Objetivo:</span>&nbsp;{athleta?.goals}</p>
        </div>
      </div>

      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
        <h2 className="font-bold text-slate-800 mb-2">Datos clínicos</h2>
        <div className="text-gray-700 space-y-1 text-sm">
          <p><span className="font-semibold">Género:</span>&nbsp;{athleta?.gender}</p>
          <p><span className="font-semibold">Altura:</span>&nbsp;{athleta?.height}</p>
          <p><span className="font-semibold">Peso:</span>&nbsp;{athleta?.weight}</p>
          <p><span className="font-semibold">Lesiones:</span>&nbsp;{athleta?.injuries}</p>
        </div>
      </div>

      <Link to='/edit-athlete' className="mt-4 w-full max-w-sm bg-slate-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow hover:bg-slate-700 transition">
        <PencilIcon className="w-5 h-5" />
        Editar perfil
      </Link>
    </div>
  );
}
