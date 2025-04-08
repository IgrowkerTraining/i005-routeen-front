import useAppContext from "../../store/AppContext"
import { ToastNotifier } from "../Notifier/Notifier"


export const MiComponente = () => {
  const { store, actions } = useAppContext()

  const handleClick = () => {
    actions.showToast(3) 
  }

  return (
  <>
  <ToastNotifier toasts={store.toasts} removeToast={actions.removeToast} />
  <button onClick={handleClick}>Mostrar Notificacion</button>
  </>
  )
}
