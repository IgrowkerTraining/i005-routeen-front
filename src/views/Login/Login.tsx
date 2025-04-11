import { useLocation } from 'react-router-dom';
import { LoginLayout } from './';
import LoginTrainer from './LoginTrainer';
import LoginAthlete from './LoginAthlete';
// import LoginAthlete from './LoginAthlete-sincontext';
// import LoginTrainer from './LoginTrainer-sincontext';

interface LocationState {
    rol?: 'trainer' | 'athlete';
}

const Login = () => {
    const location = useLocation();
    const { rol } = (location.state as LocationState) || {};

    return (
        <LoginLayout>
            {rol === 'trainer' ? <LoginTrainer /> : <LoginAthlete/>}
        </LoginLayout>
    );
};

export default Login; 