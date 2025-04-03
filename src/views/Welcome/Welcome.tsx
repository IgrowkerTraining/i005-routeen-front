import "./Welcome.css"
import logo from "../../assets/animacion.gif"

const Welcome = () => {
  return (
    <div className="welcome_container">
      <div className="logo_container">
        <img className="logo" src={logo} alt="Routeen" />
      </div>
    </div>
  )
}

export default Welcome;