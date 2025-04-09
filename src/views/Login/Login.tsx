import { useLocation, Navigate } from 'react-router-dom';
import { LoginLayout } from './';
import LoginAthlete2 from './LoginAthlete copy';
import LoginTrainer2 from './LoginTrainer copy';
// import LoginTrainer from './LoginTrainer';
// import LoginAthlete from './LoginAthlete';

interface LocationState {
    role?: 'trainer' | 'athlete';
}

const Login = () => {
    const location = useLocation();
    const { role } = (location.state as LocationState) || {};

    if (!role) {
        return <Navigate to="/" replace />;
    }

    return (
        <LoginLayout>
            {role === 'trainer' ? <LoginTrainer2 /> : <LoginAthlete2 />}
        </LoginLayout>
    );
};

export default Login; 