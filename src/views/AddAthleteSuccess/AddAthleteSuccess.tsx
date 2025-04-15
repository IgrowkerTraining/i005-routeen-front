import { useState } from "react";
import styles from "./AddAthleteSuccess.module.css";

export const AddAthleteSuccess = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Si el clic fue directamente en el fondo (no dentro del modal), cerramos
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <i className={`${styles.arrow} bi bi-arrow-left`}></i>
                    <p className={`text-notblack-400 ${styles.agregar_alumno}`}>
                        <strong>Agregar alumno</strong>
                    </p>
                </div>
                <div className={styles.section}>
                    <h2 className={`${styles.title} text-[30px] text-notblack-400`}>
                        ¡Alumno agregado con éxito!
                    </h2>
                    <i className={`${styles.check_icon} bi bi-check-circle-fill`}></i>

                    <button
                        onClick={handleOpenModal}
                        className={`bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-5 shadow-md shadow-gray-400 ${styles.button}`}
                    >
                        Enviar código de invitación
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.36)] flex items-center justify-center z-50 px-4 sm:px-0"
                    onClick={handleBackdropClick}
                >
                    <div className={`bg-[var(--color-notwhite-400)] rounded-[16px] shadow-lg w-[90%] max-w-md relative ${styles.modal}`}>
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                            onClick={handleCloseModal}
                        >
                            {/* <i className="bi bi-x-lg"></i> */}
                        </button>
                        <div className={styles.modal_container}>
                            <div className={styles.title_container}>
                                <p className={styles.title}><strong>Enviar código OTP</strong></p>
                            </div>
                            <div className={styles.data_container}>
                                <p className="p-5">Se generó el código correctamente, se enviará un enlace de invitación al número</p>
                                <div className={`${styles.edit_container} border-t border-b border-gray-500 p-5`}>
                                    <p>+34 5123 6549</p>
                                    <i className={`bi bi-pen-fill ${styles.pen}`}></i>
                                </div>
                                <div className="border-b border-gray-500 flex justify-center">
                                    <p className="p-5"><strong>BUS 123</strong></p>
                                </div>
                                <div className="p-4 flex justify-center gap-4">
                                    <button className="bg-secondary-400 text-notwhite-400 px-5 py-2.5 rounded-md shadow-md shadow-gray-400">
                                        Copiar código OTP
                                    </button>
                                    <button className="bg-primary-400 text-notwhite-400 px-5 py-2.5 rounded-md shadow-md shadow-gray-400 flex items-center gap-2">
                                        <i className="bi bi-send-fill"></i>
                                        Enviar código
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};
