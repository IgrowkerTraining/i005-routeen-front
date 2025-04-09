import styles from "./AddAthlete.module.css";
import Input from "../../components/Input/Input";
import { useState } from "react";

export const AddAthlete = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [objective, setObjective] = useState("");

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <i className={`${styles.arrow} bi bi-arrow-left`}></i>
                <p className=" text-notblack-400"> <strong>Agregar alumno</strong></p>
                <div>Menu</div>
            </div>
            <div className={styles.form}>
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
                        placeholder="Profesión"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                    />
                    <button
                        className="bg-primary-400 w-full text-notwhite-400 px-5 py-2.5 rounded-md mt-5 shadow-md shadow-gray-400 "
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    )
}