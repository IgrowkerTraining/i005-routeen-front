import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import InputCalendar from '../../components/Calendar/InputCalendar'
import { z } from 'zod'
import editAthleteInfo from '../../logic/athlete/editAthleteInfo'
import getAthleteInfo from '../../logic/athlete/getAthleteInfo'
import getTokenData from '../../logic/auth/getTokenData'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  birthday: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  phone: z.string().min(6, 'Teléfono inválido'),
  mail: z.string().email('Email inválido'),
  goals: z.string().optional(),
  gender: z.string().optional(),
  height: z.string()
    .min(1, 'La altura es obligatoria')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 55 && val <= 250, {
      message: 'La altura debe estar entre 55 y 250 cm',
    }),
  weight: z.string().min(1, 'La altura es obligatoria')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 40 && val <= 300, {
      message: 'El peso debe estar entre 40 y 300 kg',
    }),
  injuries: z.string().optional(),
})

const formatDateToISO = (dateStr: string) => {
  const parts = dateStr.split('/')
  if (parts.length === 3) {
    const [day, month, year] = parts
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
  return dateStr
}

export default function AthleteProfile() {
  const navigate = useNavigate()
  const [athleteId, setAthleteId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [dateBirth, setDateBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [goals, setGoals] = useState('')
  const [gender, setGender] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [injuries, setInjuries] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [file, setFile] = useState(null as File | null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchAthleteData = async () => {
      const tokenData = await getTokenData()
      if (tokenData?.role === 'athlete') {
        const id = tokenData.id
        setAthleteId(id)

        try {
          const data = await getAthleteInfo({ id })
          setName(data.name || '')
          setMail(data.email || '')
          setDateBirth(data.date_birth || '')
          setPhone(data.phone.replace(/^whatsapp:/, '').trim() || '')
          setGoals(data.goals || '')
          setGender(data.gender || '')
          setHeight(data.height || '')
          setWeight(data.weight || '')
          setInjuries(data.injuries || '')
          setProfilePicture(data.profile_picture_url || '')
        } catch (error) {
          console.error('Error al obtener datos del atleta:', error)
        }
      }
    }

    fetchAthleteData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formValues = {
      name,
      birthday: formatDateToISO(dateBirth),
      phone,
      mail,
      goals,
      gender,
      height,
      weight,
      injuries,
      file
    }

    const result = schema.safeParse(formValues)

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

    if (!athleteId) {
      console.error('ID del atleta no disponible')
      return
    }

    setErrors({})
    try {
      await editAthleteInfo({
        id: athleteId,
        name,
        email: mail,
        phone,
        date_birth: formatDateToISO(dateBirth),
        goals,
        gender,
        height,
        weight,
        injuries,
        file
      })
      setSuccessMessage('Perfil actualizado correctamente ✅')
      navigate('/profile')
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
    }
  }

  const changeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Imagen de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <i className="bi bi-person-circle text-[132px] text-gray-400" />
            )}
          </div>
        </div>

        <input 
          type="file" 
          accept="image/*"
          id="profile-update"
          className="hidden"
          onChange={changeProfilePicture}
        />
        <div className="flex justify-center mb-8">
          <label
            htmlFor="profile-update"
            className="inline-flex items-center bg-slate-800 text-white px-5 py-2 rounded-md shadow-lg cursor-pointer hover:bg-slate-700 transition duration-300"
          >
            Subir foto de perfil
          </label>
        </div>

        {successMessage && <p className="text-green-600 font-medium mb-4">{successMessage}</p>}

        <div className="flex flex-col w-full gap-4 mt-4">
          <h2 className="text-notblack-400 font-bold">Datos personales</h2>

          <Input
            id="name"
            type="text"
            placeholder="Nombre*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label
            showIcon
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <Input
            id="mail"
            type="mail"
            placeholder="E-mail*"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            label
            showIcon
          />
          {errors.mail && <p className="text-red-500 text-sm">{errors.mail}</p>}

          <Input
            id="phone"
            type="tel"
            placeholder="Teléfono*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label
            showIcon
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <InputCalendar
            id="birthday"
            label="Fecha de nacimiento"
            onChange={(e) => setDateBirth(e.target.value)}
            value={dateBirth}
            isRequired
          />
          {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday}</p>}

          <Input
            id="goals"
            type="text"
            placeholder="Objetivo"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            label
            showIcon
          />
          {errors.goals && <p className="text-red-500 text-sm">{errors.goals}</p>}

          <h2 className="text-notblack-400 font-bold">Datos clínicos</h2>

          <Input
            id="gender"
            type="text"
            placeholder="Género"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label
            showIcon
          />

          <Input
            id="height"
            type="number"
            placeholder="Altura (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            label
            showIcon
            required
          />
          {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}

          <Input
            id="weight"
            type="number"
            placeholder="Peso (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            label
            showIcon
          />
          {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}

          <Input
            id="injuries"
            type="text"
            placeholder="Lesiones"
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            label
            showIcon
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            submit
            text="Guardar"
            variant="primary"
            className="px-6 py-2 text-white hover:bg-slate-700 rounded-md shadow-md"
            icon={<i className="bi bi-bookmarks-fill"></i>}
          />
        </div>
      </form>
    </div>
  )
}
