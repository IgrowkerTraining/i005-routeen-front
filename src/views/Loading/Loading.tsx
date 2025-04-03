import "./Loading.css"
import logo from "../../../public/images/animacion.gif"

export const Loading = () => {
  return (
    <div className="welcome_container">
      <div className="logo_container">
        <img className="logo" src={logo} alt="Routeen" />
      </div>
    </div>
  )
}
