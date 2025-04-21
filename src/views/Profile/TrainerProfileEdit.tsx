import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { BookmarkIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import getTrainerInfo from "../../logic/trainer/getTrainerInfo"
import updateTrainer from "../../logic/trainer/updateTrainer"

export default function TrainerProfileEdit() {
    const navigate = useNavigate()
    const trainerId = useParams().id!
    const [dataTrainer, setDataTrainer] = useState({
        name: '',
        email: '',
        phone: '',
        date_birth: ''
    })

    useEffect(() => {
        const fetchAthlete = async () => {
            try {
              const data = await getTrainerInfo({ id: trainerId });
              setDataTrainer({
                name: data.name,
                email: data.email,
                phone: data.phone,
                date_birth: data.date_birth,
              });
            } catch (error) {
              console.error("Error fetching athlete:", error);
            }
          };
      
          fetchAthlete();
    }, [trainerId])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDataTrainer((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const fd = new FormData();
        fd.append("name", dataTrainer.name);
        fd.append("email", dataTrainer.email);
        fd.append("phone", dataTrainer.phone);
        fd.append("date_birth", dataTrainer.date_birth);

        try {
            await updateTrainer({ id: trainerId, data: fd })
            navigate('/profile')
        } catch (error) {
            console.log("Error actualizar perfil")
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center p-6 space-y-6 min-h-screen bg-gray-50">
          
          <h1 className="text-1xl text-center">Editar perfil</h1>
    
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center">
            {false ? (
                    <img
                        // src={imagePreview}
                        // onClick={handleImageClick}
                        //onError={handleImageError}
                        alt="Imagen de perfil"
                        className="w-33 h-33 rounded-full object-cover cursor-pointer"
                    />
                ) : (
                    <i className="bi bi-person-circle text-[132px]" />
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
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={dataTrainer?.name || ''}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Ingrese e-mail"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={dataTrainer?.email || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={dataTrainer?.phone || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="date_birth"
                    placeholder="Fecha de nacimiento"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={dataTrainer?.date_birth || ''}
                    onChange={handleChange}
                />
        
                <div className="w-full max-w-sm pt-6">
                    <button className="flex justify-center items-center gap-2 w-full px-6 py-3 bg-slate-800 text-white font-semibold rounded shadow hover:bg-slate-700 transition">
                        <BookmarkIcon className="w-5 h-5" />
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
