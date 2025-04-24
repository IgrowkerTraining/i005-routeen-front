import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { BookmarkIcon } from 'lucide-react'
import { z } from 'zod'
import { Trainer } from '../../logic/interfaces/trainer'
import getTrainerInfo from '../../logic/trainer/getTrainerInfo'
import editTrainerInfo from '../../logic/trainer/editTrainerInfo'

const trainerSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(6, 'Teléfono inválido'),
  date_birth: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
})

export default function TrainerProfileEdit() {
  const { id: trainerId } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date_birth: '',
    profile_picture_url: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        if (!trainerId) return
        const data: Trainer = await getTrainerInfo({ id: trainerId })
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          date_birth: data.date_birth || '',
          profile_picture_url: data.profile_picture_url || '',
        })
      } catch (error) {
        console.error('Error fetching trainer info:', error)
      }
    }

    fetchTrainer()
  }, [trainerId])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const result = trainerSchema.safeParse(formData)

    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0]] = err.message
        }
      })
      setErrors(formattedErrors)
      return
    }

    setErrors({})
    try {
      if (!trainerId) throw new Error('ID de entrenador no disponible')

      const response = await editTrainerInfo({
        id: trainerId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date_birth: formData.date_birth,
      })

      console.log('Datos actualizados correctamente:', response)
      // Puedes navegar o mostrar notificación aquí si quieres
    } catch (error) {
      console.error('Error al actualizar los datos:', error)
      // Aquí podrías setear errores generales o mostrar un mensaje al usuario
    }
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6 min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow">
          {formData.profile_picture_url ? (
            <img
              src={formData.profile_picture_url}
              alt="Imagen de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <i className="bi bi-person-circle text-[132px] text-gray-400" />
          )}
        </div>

        <button className="bg-slate-800 text-white px-4 py-2 rounded shadow hover:bg-slate-700 transition">
          Subir foto de perfil
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col space-y-4"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="border border-gray-300 rounded p-2 shadow-sm w-full"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Ingrese e-mail"
            className="border border-gray-300 rounded p-2 shadow-sm w-full"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            className="border border-gray-300 rounded p-2 shadow-sm w-full"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="date_birth"
            placeholder="Fecha de nacimiento"
            className="border border-gray-300 rounded p-2 shadow-sm w-full"
            value={formData.date_birth}
            onChange={handleChange}
          />
          {errors.date_birth && (
            <p className="text-red-500 text-sm">{errors.date_birth}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex justify-center items-center gap-2 w-full px-6 py-3 bg-slate-800 text-white font-semibold rounded shadow hover:bg-slate-700 transition"
        >
          <BookmarkIcon className="w-5 h-5" />
          Guardar
        </button>
      </form>
    </div>
  )
}
