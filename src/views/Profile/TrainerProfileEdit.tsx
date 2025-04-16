import { Button } from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { useState, useRef } from "react"
//import { useNavigate } from "react-router-dom"
import InputCalendar from "../../components/Calendar/InputCalendar"

export default function TrainerProfileEdit() {
    //const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [phone, setPhone] = useState("")
    const [mail, setMail] = useState("")
    const [center, setCenter] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [error, setError] = useState("")

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImage(file)
        const url = URL.createObjectURL(file)
        setImagePreview(url)
        setError("")
    }
    //TODO : manejar errores
    const handleImageError = () => {
        setError("Error al cargar la imagen")
        setImage(null)
        setImagePreview(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("birthday", birthday)
        formData.append("phone", phone)
        if (image) formData.append("file", image)

        try {
            // await updateProfile(formData) 
            // navigate("/home")
        } catch (error) {
            console.error("Error al enviar el formulario", error)
            setError("Error al enviar el formulario")
            setImage(null)
            setImagePreview(null)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center p-4">

            <section className="flex items-center w-full gap-5">
                <h2 className="text-[40px] text-notblack-400">
                    Editar perfil
                </h2>
            </section>
            <section className="flex justify-between items-center w-full p-3 mt-4">
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        onClick={handleImageClick}
                        onError={handleImageError}
                        alt="Imagen de perfil"
                        className="w-33 h-33 rounded-full object-cover cursor-pointer"
                    />
                ) : (
                    <i className="bi bi-person-circle text-[132px]"
                        onClick={handleImageClick}
                    >
                    </i>
                )}
                <button
                    onClick={handleImageClick}
                    className="bg-primary-400 text-notwhite-400 p-3 rounded-md shadow-md shadow-gray-400"
                >
                    Subir foto de perfil
                </button>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
            </section>
            <form
                onSubmit={handleSubmit}
                className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8">
                <div className="flex flex-col justify-start w-full gap-4 mt-4">
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
                    <Input id="sport-center" type="text" placeholder="Centro deportivo" value={center} onChange={(e) => setCenter(e.target.value)} label showIcon />

                </div>

                <Button
                    text="Siguiente"
                    variant="primary"
                    href="/home"
                    className="mt-4"
                />
            </form>
        </div>
    )
}

