import { useAuth } from '../../store/AuthContext';
import HomeAthlete from "./HomeAthlete"
import HomeTrainer from "./HomeTrainer"
import { Loading } from '../Loading/Loading';

export default function Home() {
    const { user, loading } = useAuth()
    if (loading) return <Loading />

    if (!user) return null

    return (
        <div>
            {user?.role === 'trainer' ? <HomeTrainer /> : <HomeAthlete />}
        </div>
    )
}

