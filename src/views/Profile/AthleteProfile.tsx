import { Button } from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { useState } from "react"
import InputCalendar from "../../components/Calendar/InputCalendar"
export default function AthleteProfile() {
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [phone, setPhone] = useState("")
    const [mail, setMail] = useState("")
    const [goal, setGoal] = useState("")
    const [gender, setGender] = useState("")
    const [hight, setHight] = useState("")
    const [weight, setWeight] = useState("")
    const [injuries, setInjuries] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("birthday", birthday)
        formData.append("phone", phone)
        formData.append("mail", mail)
        formData.append("goal", goal)
        formData.append("gender", gender)
        formData.append("hight", hight)
        formData.append("weight", weight)
        formData.append("injuries", injuries)


        try {
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`)
            }
            // await updateProfile(formData) 
            // navigate("/home")
        } catch (error) {
            console.error("Error al enviar el formulario", error)

        }
    }

    return (
        <div className="min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-10">
                <section className="flex items-center w-full gap-5">
                    <h2 className="text-[40px] text-notblack-400">
                        Ingresar datos personales
                    </h2>
                </section>
                <div className="flex flex-col w-full gap-4 mt-4">
                    <h2 className="text-notblack-400  font-bold">Datos personales</h2>

                    <Input id="name" type="text" placeholder="Nombre*" value={name} onChange={(e) => setName(e.target.value)} label showIcon />
                    <Input id="mail" type="mail" placeholder="E-mail*" value={mail} onChange={(e) => setMail(e.target.value)} label showIcon />
                    <Input id="phone" type="tel" placeholder="Teléfono*" value={phone} onChange={(e) => setPhone(e.target.value)} label showIcon />
                    <InputCalendar
                        id="birthday"
                        label="Fecha de nacimiento"
                        onChange={(e) => setBirthday(e.target.value)}
                        value={birthday}
                        isRequired
                    />
                    <Input id="goal" type="text" placeholder="Objetivo" value={goal} onChange={(e) => setGoal(e.target.value)} label showIcon />

                    <h2 className="text-notblack-400  font-bold">Datos clínicos</h2>
                    <Input id="gender" type="text" placeholder="Género" value={gender} onChange={(e) => setGender(e.target.value)} label showIcon />
                    <Input id="hight" type="number" placeholder="Altura (cm)" value={hight} onChange={(e) => setHight(e.target.value)} label showIcon />
                    <Input id="weight" type="number" placeholder="Peso (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} label showIcon />
                    <Input id="injuries" type="text" placeholder="Lesiones" value={injuries} onChange={(e) => setInjuries(e.target.value)} label showIcon />
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
