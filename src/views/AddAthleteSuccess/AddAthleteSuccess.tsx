import { useRef, useEffect, useState } from "react";
import styles from "./AddAthleteSuccess.module.css";
import getTokenData from "../../logic/auth/getTokenData";
import useAppContext from "../../store/AppContext";
import getOTP from "../../logic/trainer/getOTP";

interface TrainerData {
    role: "trainer" | "athlete";
    name: string;
    id: string;
}

export const AddAthleteSuccess = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trainerData, setTrainerData] = useState<TrainerData | null>(null);
    const [OTPcode, setOTPcode] = useState<string | null>(null);
    const { store } = useAppContext();
    const { athletePhone } = store;
    const [phone, setPhone] = useState<string>(athletePhone || "");
    const hasFetchedOTP = useRef(false); // 👈

    useEffect(() => {
        const fetchTokenData = async () => {
            const data = await getTokenData();
            if (data) {
                setTrainerData({
                    ...data,
                    id: String(data.id),
                });
            }
        };

        fetchTokenData();
    }, []);

    useEffect(() => {
        const fetchOTP = async () => {
            if (
                hasFetchedOTP.current || 
                !trainerData?.id ||
                !store.newAthleteId
            ) {
                return;
            }
    
            try {
                hasFetchedOTP.current = true; 
                const otpResponse = await getOTP(store.newAthleteId, trainerData.id);
                setOTPcode(otpResponse?.otpRecord.otp_code || null);
            } catch (error) {
                console.error("Error al obtener el OTP:", error);
            }
        };
    
        fetchOTP();
    }, [trainerData, store.newAthleteId]);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const handleSendWhatsApp = () => {
        const message = `Hola, ${store.athleteName}! Tu código *ROUTEEN* es *${OTPcode}*`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
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
                    <div
                        className={`bg-[var(--color-notwhite-400)] rounded-[16px] shadow-lg w-[90%] max-w-md relative ${styles.modal}`}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                            onClick={handleCloseModal}
                        ></button>
                        <div className={styles.modal_container}>
                            <div className={styles.title_container}>
                                <p className={styles.title}>
                                    <strong>Enviar código OTP</strong>
                                </p>
                            </div>
                            <div className={styles.data_container}>
                                <p className="p-5">
                                    Se generó el código correctamente, se enviará un enlace de
                                    invitación al número
                                </p>
                                <div
                                    className={`${styles.edit_container} border-t border-b border-gray-500 p-5`}
                                >
                                    <input
                                        type="tel"
                                        value={phone || ""}
                                        className={`bg-transparent text-lg p-1 ${styles.phone}`}
                                    />
                                </div>
                                <div className="border-b border-gray-500 flex justify-center">
                                    <p className="p-5">
                                        <strong>{OTPcode || "Cargando código..."}</strong>
                                    </p>
                                </div>
                                <div className="p-4 flex justify-center gap-4">
                                    <button
                                        className="bg-secondary-400 text-notwhite-400 px-5 py-2.5 rounded-md shadow-md shadow-gray-400"
                                        onClick={() => {
                                            if (OTPcode) navigator.clipboard.writeText(OTPcode);
                                        }}
                                    >
                                        Copiar código OTP
                                    </button>
                                    <button
                                        className="bg-primary-400 text-notwhite-400 px-5 py-2.5 rounded-md shadow-md shadow-gray-400 flex items-center gap-2"
                                        onClick={handleSendWhatsApp}
                                    >
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
