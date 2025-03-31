import "./Card.css";
import useAppContext from "../../store/AppContext";

const Card = () => {

    const { store, actions } = useAppContext();
    return(
        <>
        <button onClick={() => actions.setEjemplo(prev => prev + 1)}>{store.ejemplo}</button>
        </>
    )
}

export default Card;