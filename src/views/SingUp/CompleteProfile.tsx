import { Button } from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import InputCalendar from "../../components/Calendar/InputCalendar"
import { useAuth } from "../../store/AuthContext"

export default function CompleteProfile() {
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { tempRegisterData, register } = useAuth()

    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [error, setError] = useState("")

    const handleImageClick = () => fileInputRef.current?.click()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImage(file)
        setImagePreview(URL.createObjectURL(file))
        setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validaciones básicas, validar con zod
        if (!name.trim()) {
            setError("El nombre es requerido")
            return
        }

        if (!phone.trim()) {
            setError("El teléfono es requerido")
            return
        }

        if (!birthday) {
            setError("La fecha de nacimiento es requerida")
            return
        }

        if (!tempRegisterData) {
            setError("Faltan datos de registro previo")
            return
        }

        if (!image) {
            setError("La imagen de perfil es requerida")
            return
        }

        try {
            // Convertir formato de fecha de DD/MM/AAAA a AAAA-MM-DD
            let formattedDate = birthday
            if (birthday && birthday.includes('/')) {
                const [day, month, year] = birthday.split('/')
                formattedDate = `${year}-${month}-${day}`
            }

            await register({
                name: name.trim(),
                email: tempRegisterData.email.trim(),
                password: tempRegisterData.password,
                repeat_password: tempRegisterData.repeat_password,
                phone: phone.trim(),
                date_birth: formattedDate,
                file: image
            })

            navigate("/login", { state: { rol: "trainer" } })
        } catch (err: any) {
            console.error("Error detallado:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                config: err.config
            })
            // Mostrar mensaje de error más específico si está disponible
            const errorMessage = err.response?.data || "Error al enviar el formulario"
            setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full sm:max-w-lg sm:bg-notwhite-400 sm:rounded-xl sm:shadow-lg sm:p-8"
            >
                <h2 className="text-[32px] text-notblack-400 mb-4">
                    Ingresar datos personales
                </h2>

                <div className="flex flex-col gap-4">
                    <Input id="name" type="text" placeholder="Nombre*" value={name} onChange={(e) => setName(e.target.value)} label showIcon />
                    <Input id="phone" type="tel" placeholder="Teléfono*" value={phone} onChange={(e) => setPhone(e.target.value)} label showIcon />
                    <InputCalendar id="birthday" label="Fecha de nacimiento" onChange={(e) => setBirthday(e.target.value)} value={birthday} isRequired />
                </div>

                <section className="flex justify-between items-center w-full p-3 mt-4">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            onClick={handleImageClick}
                            onError={() => {
                                setError("Error al cargar la imagen")
                                setImage(null)
                                setImagePreview(null)
                            }}
                            alt="Imagen de perfil"
                            className="w-33 h-33 rounded-full object-cover cursor-pointer"
                        />
                    ) : (
                        <i className="bi bi-person-circle text-[132px]" onClick={handleImageClick} />
                    )}
                    <button
                        onClick={handleImageClick}
                        className="bg-primary-400 text-notwhite-400 p-3 rounded-md shadow-md shadow-gray-400"
                        type="button"
                    >
                        Subir foto de perfil
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </section>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button submit text="Siguiente" variant="primary" className="mt-4" />
            </form>
        </div>
    )
}
