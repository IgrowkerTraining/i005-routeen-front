import styles from "./AddAthlete.module.css";
import Input from "../../components/Input/Input";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const AddAthlete = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [objective, setObjective] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("date_birth", birthday);
            formData.append("goals", objective);

            const response = await axios.post(`${API_URL}api/athlete`, formData);
            console.log("Athlete created!", response.data);
            // Podés redirigir o mostrar feedback acá
        } catch (error: any) {
            console.error("Error creating athlete:", error.response?.data || error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <i className={`${styles.arrow} bi bi-arrow-left`}></i>
                <p className=" text-notblack-400"><strong>Agregar alumno</strong></p>
                <div>Menu</div>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={`${styles.title} text-[30px] text-notblack-400`}>
                    Ingresar datos personales
                </h2>
                <div className={styles.form_container}>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Ingrese e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                        id="birthday"
                        type="date"
                        placeholder="Fecha de nacimiento"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    <Input
                        id="profession"
                        type="text"
                        placeholder="El alumno quiere..."
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-5 shadow-md shadow-gray-400"
                    >
                        Siguiente
                    </button>
                </div>
            </form>
        </div>
    );
};
