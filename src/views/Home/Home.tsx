// import { useContext } from "react"  
//import { AuthContext } from "../context/AuthContext"
import HomeAthlete from "./HomeAthlete"
import HomeTrainer from "./HomeTrainer"

const user = {
    //rol: "atleta",
     rol: "entrenador",
}
export default function Home() {
    return (
        <div>
            {user.rol === "entrenador" ? <HomeTrainer /> : <HomeAthlete />}
        </div>
    )
    //const { user } = useContext(AuthContext)

}

