// import { useContext } from "react"  
//import { AuthContext } from "../context/AuthContext"
import AthleteProfile from "./AthleteProifile"
import TrainerProfile from "./TrainerProfile"

const user = {
    //rol: "atleta",
     rol: "entrenador",
}
export default function Profile() {
    return (
        <div>
            {user.rol === "entrenador" ? <TrainerProfile /> : <AthleteProfile />}
        </div>
    )
    //const { user } = useContext(AuthContext)

}

