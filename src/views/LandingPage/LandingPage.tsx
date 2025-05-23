import logo from "../../../public/images/logo-clear.png";
import styles from "./LandingPage.module.css"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../store/AuthContext'
import { Navigate } from "react-router-dom"
import { Loading } from "../Loading/Loading"


export const LandingPage = () => {
    const navigate = useNavigate()
    const { user, loading } = useAuth()

    if (loading) return <Loading />

    if (user) return <Navigate to="/home" replace />
    const handleRoleSelection = (rol: 'trainer' | 'athlete') => {

        navigate('/login', { state: { rol }, replace: true })
    };

    return (
        <div className={styles.landing_container}>
            <div className={styles.images_container}>
                <div className={styles.logo_container}>
                    <img src={logo} alt="routeen" />
                </div>
                <div className={styles.titles_container}>
                    <h2 className={`${styles.routeen} text-6xl font-conthrax w-max`}>ROUTEEN</h2>
                    <h2 className={`${styles.fitness} text-[19px] font-bebas tracking-[0.45em] mb-5 ransform scale-y-125`} style={{ fontSize: ".8rem" }}>-FITNESS MANAGER-</h2>
                </div>
            </div>
            <div className={styles.sub_container}>
                <h3 style={{ fontSize: "40px" }} className={styles.bienvenida}>Te damos la bienvenida</h3>
                <h2 style={{ fontSize: "32px" }} className={styles.ingresar}>Ingresar como</h2>
                <button
                    onClick={() => handleRoleSelection('trainer')}
                    className="bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-5 shadow-md shadow-gray-400 cursor-pointer"
                    type="button"
                >
                    Entrenador
                </button>
                <button
                    onClick={() => handleRoleSelection('athlete')}
                    className="bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-5 shadow-md shadow-gray-400 cursor-pointer"
                    type="button"
                >
                    Alumno
                </button>
            </div>

        </div>
    )
}