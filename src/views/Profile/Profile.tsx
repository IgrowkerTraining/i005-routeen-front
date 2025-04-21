import AthleteProfile from "./AthleteProfile"
import { useAuth } from "../../store/AuthContext"
import { Navigate } from "react-router-dom"
import TrainerProfile from "./TrainerProfile";

export default function Profile() {

    const { user, loading } = useAuth();
    if (loading) {
        console.log("Loading...")
        return null
    }
    if (!user) return <Navigate to="/welcome" replace />;

    return (
        <>
            {user.role === "trainer" ? <TrainerProfile /> : <AthleteProfile />}
        </>
    )
}

