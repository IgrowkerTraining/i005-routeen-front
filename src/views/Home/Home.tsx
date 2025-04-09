import { useAuth } from '../../store/AuthContext';
import HomeAthlete from "./HomeAthlete"
import HomeTrainer from "./HomeTrainer"
import { Navigate } from 'react-router-dom';

export default function Home() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            {user.role === "trainer" ? <HomeTrainer /> : <HomeAthlete />}
        </div>
    );
}

