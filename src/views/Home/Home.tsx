import { useAuth } from '../../store/AuthContext';
import HomeAthlete from "./HomeAthlete"
import HomeTrainer from "./HomeTrainer"
import { Navigate } from 'react-router-dom';

export default function Home() {
    const { user, loading } = useAuth();
    if (loading) {
        console.log("Loading...")
        return null
    }
    if (!user) return <Navigate to="/welcome" replace />;


    return (
        <div>
            {user.role === "trainer" ? <HomeTrainer /> : <HomeAthlete />}
        </div>
    );
}

