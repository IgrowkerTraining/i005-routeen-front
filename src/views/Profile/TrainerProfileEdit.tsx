import { useState, useEffect, ChangeEvent } from "react"
import { BookmarkIcon } from "lucide-react"
import { useParams } from "react-router-dom"
import { Trainer } from "../../logic/interfaces/trainer"
import getTrainerInfo from "../../logic/trainer/getTrainerInfo"

export default function TrainerProfileEdit() {
    const trainerId = useParams().id!
    const [trainer, setTrainer] = useState<Trainer>();
    const [dataTrainer, setDataTrainer] = useState({
        name: trainer?.name,
        email: trainer?.email,
        phone: trainer?.phone,
        date: trainer?.date_birth
    })

    useEffect(() => {
        const fetchAthlete = async () => {      
            try {
              const data = await getTrainerInfo({ id: trainerId });
              setTrainer(data);
            } catch (error) {
              console.error("Error fetching athlete:", error);
            }
          };
      
          fetchAthlete();
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDataTrainer((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log(dataTrainer)
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
    
            <form className="w-full max-w-sm flex flex-col space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={trainer?.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Ingrese e-mail"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={trainer?.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={trainer?.phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="date_birth"
                    placeholder="Fecha de nacimiento"
                    className="border border-gray-300 rounded p-2 shadow-sm"
                    value={trainer?.date_birth}
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
