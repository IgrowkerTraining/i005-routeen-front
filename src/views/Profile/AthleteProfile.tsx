import { useState, useEffect } from 'react'
import { Button } from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import InputCalendar from '../../components/Calendar/InputCalendar'
import { z } from 'zod'
import editAthleteInfo from '../../logic/athlete/editAthleteInfo'
import getAthleteInfo from '../../logic/athlete/getAthleteInfo'
import getTokenData from '../../logic/auth/getTokenData'

const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  birthday: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  phone: z.string().min(6, 'Teléfono inválido'),
  mail: z.string().email('Email inválido'),
  goal: z.string().optional(),
  gender: z.string().optional(),
  hight: z.string().regex(/^\d+$/, 'Altura debe ser un número'),
  weight: z.string().regex(/^\d+$/, 'Peso debe ser un número'),
  injuries: z.string().optional(),
})

export default function AthleteProfile() {
  const [athleteId, setAthleteId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [goal, setGoal] = useState('')
  const [gender, setGender] = useState('')
  const [hight, setHight] = useState('')
  const [weight, setWeight] = useState('')
  const [injuries, setInjuries] = useState('')
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
          setPhone(data.phone || '')
          setBirthday(data.date_birth || '')
          setGoal(data.goal || '')
          setGender(data.gender || '')
          setHight(data.hight || '')
          setWeight(data.weight || '')
          setInjuries(data.injuries || '')
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
      birthday,
      phone,
      mail,
      goal,
      gender,
      hight,
      weight,
      injuries,
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
        date_birth: birthday,
        goal,
        gender,
        hight,
        weight,
        injuries,
      })
      setSuccessMessage('Perfil actualizado correctamente ✅')
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
    }
  }

  return (
    <div className="min-h-screen bg-notwhite-400 sm:flex sm:items-center sm:justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-10"
      >
        <section className="flex items-center w-full gap-5">
          <h2 className="text-[40px] text-notblack-400">
            Ingresar datos personales
          </h2>
        </section>

        {successMessage && (
          <p className="text-green-600 font-medium mb-4">{successMessage}</p>
        )}

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
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          <InputCalendar
            id="birthday"
            label="Fecha de nacimiento"
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            isRequired
          />
          {errors.birthday && (
            <p className="text-red-500 text-sm">{errors.birthday}</p>
          )}

          <Input
            id="goal"
            type="text"
            placeholder="Objetivo"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            label
            showIcon
          />

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
            id="hight"
            type="number"
            placeholder="Altura (cm)"
            value={hight}
            onChange={(e) => setHight(e.target.value)}
            label
            showIcon
          />
          {errors.hight && (
            <p className="text-red-500 text-sm">{errors.hight}</p>
          )}

          <Input
            id="weight"
            type="number"
            placeholder="Peso (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            label
            showIcon
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight}</p>
          )}

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

        <Button
          submit
          text="Guardar"
          variant="primary"
          className="mt-4"
          icon={<i className="bi bi-bookmarks-fill"></i>}
        />
      </form>
    </div>
  )
}
