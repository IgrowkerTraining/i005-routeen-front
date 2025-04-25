import { PencilIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import getTokenData from '../../logic/auth/getTokenData'
import getTrainerInfo from '../../logic/trainer/getTrainerInfo'
import { Trainer, TrainerBasic } from '../../logic/interfaces/trainer'
import { useNavigate } from 'react-router-dom'

export default function TrainerProfile() {
  const navigate = useNavigate()
  const [trainer, setTrainer] = useState<Trainer>()

  useEffect(() => {
    const fetchAthlete = async () => {
      const tokenData = await getTokenData()
      if (!tokenData) {
        console.error('No trainer data found')
        return
      }

      try {
        const data = await getTrainerInfo(tokenData as TrainerBasic)
        setTrainer(data)
      } catch (error) {
        console.error('Error fetching athlete:', error)
      }
    }

    fetchAthlete()
  }, [])

  if (!trainer) {
    return <p className="text-center">Cargando datos del entrenador...</p>
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 min-h-screen relative">
      <img
        src={trainer.profile_picture_url}
        alt="Perfil"
        className="w-24 h-24 rounded-full object-cover shadow-md"
      />

      <div className="w-full max-w-sm bg-white border border-gray-300 rounded p-4 shadow-sm">
        <h2 className="font-bold text-slate-800">Datos personales</h2>
        <div className="text-gray-700 space-y-2 text-sm">
          <p>
            <span className="font-semibold">Nombre:</span>&nbsp;{trainer.name}
          </p>
          <p>
            <span className="font-semibold">E-mail:</span>&nbsp;{trainer.email}
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span>&nbsp;
            {trainer.phone}
          </p>
          <p>
            <span className="font-semibold">Fecha de nacimiento:</span>&nbsp;
            {trainer.date_birth}
          </p>
        </div>
      </div>

      <div className="h-20"></div>

      <div className="fixed bottom-4 w-full flex justify-center">
        <div className="w-full max-w-sm px-4">
          <button
            onClick={() => navigate(`/edit-profile/${trainer._id}`)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-semibold rounded-md shadow hover:bg-slate-700 transition"
          >
            <PencilIcon className="w-5 h-5" />
            Editar datos
          </button>
        </div>
      </div>
    </div>
  )
}
