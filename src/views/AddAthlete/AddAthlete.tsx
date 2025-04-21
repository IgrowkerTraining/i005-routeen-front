import styles from "./AddAthlete.module.css";
import Input from "../../components/Input/Input";
import { useState } from "react";
import InputCalendar from "../../components/Calendar/InputCalendar";
import { Button } from "../../components/Button/Button";
import addAthlete from "../../logic/trainer/addAthlete";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../store/AppContext";

export const AddAthlete = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [objective, setObjective] = useState("");
  const navigate = useNavigate();
  const { actions } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let formattedDate = birthday;
      if (birthday && birthday.includes("/")) {
        const [day, month, year] = birthday.split("/");
        formattedDate = `${year}-${month}-${day}`;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("date_birth", formattedDate);
      formData.append("goals", objective);

      const res = await addAthlete(formData);
      if (res?.newAthlete?._id) {
        actions.setNewAthleteId(res.newAthlete._id);
        actions.setAthletePhone(phone);
        actions.setAthleteName(name);
        actions.showToast(4)
        navigate("/add-athlete-success");
      }
    } catch (error: any) {
      actions.showToast(2)
      console.error("Error creating athlete:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <i className={`${styles.arrow} bi bi-arrow-left`}></i>
        <p className="text-notblack-400"><strong>Agregar alumno</strong></p>
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
            label
          />
          <Input
            id="email"
            type="email"
            placeholder="Ingrese e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label
          />
          <Input
            id="phone"
            type="tel"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label
          />
          <InputCalendar
            id="birthday"
            label="Fecha de nacimiento"
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            isRequired
          />
          <Input
            id="profession"
            type="text"
            placeholder="El alumno quiere..."
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            label
          />
          <Button text="Siguiente" submit />
        </div>
      </form>
    </div>
  );
};
