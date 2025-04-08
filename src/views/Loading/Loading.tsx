import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Loading.module.css"
import logo from "../../../public/images/animacion.gif"

export const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome")
    }, 4000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className={styles.welcome_container}>
      <div className={styles.logo_container}>
        <img className={styles.logo} src={logo} alt="Routeen" />
      </div>
    </div>
  )
}
