import { useLocation } from 'react-router-dom'
import { LoginLayout } from './'
import LoginTrainer from './LoginTrainer'
import LoginAthlete from './LoginAthlete'
import { useAuth } from '../../store/AuthContext'
import { Navigate } from 'react-router-dom'

interface LocationState {
    rol?: 'trainer' | 'athlete'
}

const Login = () => {

    const location = useLocation()
    const { rol } = (location.state as LocationState) || {}
    const { user, loading } = useAuth()

if (loading) return null;
    if (user) {
        return <Navigate to="/home" replace />
    }
    return (
        <LoginLayout>
            {rol === 'trainer' ? <LoginTrainer /> : <LoginAthlete />}
        </LoginLayout>
    );
};

export default Login; 