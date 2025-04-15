import styles from "./AddAthleteSuccess.module.css";

export const AddAthleteSuccess = () => {
    return (

        <div className={styles.container}>
            <div className={styles.header}>
                <i className={`${styles.arrow} bi bi-arrow-left`}></i>
                <p className={`text-notblack-400 ${styles.agregar_alumno}`}> <strong>Agregar alumno</strong></p>
            </div>
            <div className={styles.section}>
                <h2 className={`${styles.title} text-[30px] text-notblack-400`}>
                    ¡Alumno agregado con éxito!
                </h2>
                <i className={`${styles.check_icon} bi bi-check-circle-fill`}></i>

                <button
                    className={`bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-5 shadow-md shadow-gray-400 ${styles.button}`}
                >
                    Enviar código de invitación
                </button>
            </div>
        </div>
    )
}