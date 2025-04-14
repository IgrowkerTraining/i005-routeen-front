//import { useContext } from "react"  
//import { AuthContext } from "../context/AuthContext"
import AthleteProfile from "./AthleteProfile"
import TrainerProfileEdit from "./TrainerProfileEdit"
import { useAuth } from "../../store/AuthContext"
import { Navigate } from "react-router-dom"


export default function Profile() {

    const { user, loading } = useAuth();
    if (loading) {
        console.log("Loading...")
        return null
    }
    if (!user) return <Navigate to="/welcome" replace />;

    return (

        <div>
            {user.role === "trainer" ? <TrainerProfileEdit /> : <AthleteProfile />}
        </div>
    )
}

