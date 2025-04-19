import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAthleteById from "../../../logic/trainer/getAthleteById";
import getTokenData from "../../../logic/auth/getTokenData";
import { Athlete } from "../../../types";

export const AthleteInfoTab = () => {
    const { id } = useParams()
    const [athlete, setAthlete] = useState<Athlete>();

    useEffect(() => {
        const fetchAthlete = async () => {
          if (!id) return;
    
          const tokenData = await getTokenData();
          if (!tokenData) {
            console.error("No trainer data found");
            return;
          }
    
          try {
            const data = await getAthleteById({
              trainer_id: tokenData.id,
              athlete_id: id,
            });
            setAthlete(data);
          } catch (error) {
            console.error("Error fetching athlete:", error);
          }
        };
    
        fetchAthlete();
      }, [id]);

      if (!athlete) {
        return <p className="text-center">Cargando datos del atleta...</p>;
      }
    
      return (
        <div className="max-w-md mx-auto mt-8 space-y-6">
          <div className="border border-gray-300 rounded-lg p-2">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-slate-800">Datos personales</h2>
              <PencilIcon className="w-5 h-5 text-slate-800 cursor-pointer hover:text-gray-700" />
            </div>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><span className="font-semibold">Nombre: </span>&nbsp;{athlete.name}</p>
              <p><span className="font-semibold">E-mail: </span>&nbsp;{athlete.email}</p>
              <p><span className="font-semibold">Teléfono: </span>&nbsp;{athlete.phone}</p>
              <p><span className="font-semibold">Fecha de nacimiento: </span>&nbsp;{athlete.date_birth}</p>
              <p><span className="font-semibold">Objetivo: </span>&nbsp;{athlete.goals}</p>
            </div>
          </div>
    
          <div className="border border-gray-300 rounded-lg p-2">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Datos clínicos</h2>
            <div className="text-gray-700 space-y-1 text-sm">
              <p><span className="font-semibold">Género: </span>&nbsp;{athlete.gender}</p>
              <p><span className="font-semibold">Altura: </span>&nbsp;{athlete.height} cm</p>
              <p><span className="font-semibold">Peso: </span>&nbsp;{athlete.weight} kg</p>
              <p><span className="font-semibold">Lesiones: </span>&nbsp;{athlete.injuries || "Ninguna"}</p>
            </div>
          </div>
        </div>
      );  
}